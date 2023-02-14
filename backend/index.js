require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
const { LoremIpsum } = require("lorem-ipsum");

const { initializeApp } = require("firebase/compat/app");
const {
  getFirestore,
  collection,
  getDoc,
  doc,
  addDoc,
} = require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGIN_SENDER_ID,
  appId: process.env.APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const sdk = require("stellar-sdk");
const { Keypair, Asset, Server, TransactionBuilder, Operation } = sdk;
const SERVER_URL =
  process.env.SERVER_URL || "https://horizon-testnet.stellar.org";
const server = new Server(SERVER_URL);

app.get("/", (req, res) => {
  res.send("Nothing to see here...");
});

app.post("/save", async (req, res) => {
  try {
    const { id, preview } = await saveToDb(req.body);
    res.send({ id, preview });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get("/preview/:id", async (req, res) => {
  const preview = await getPreview(req.params.id);
  res.send(preview);
});

app.get("/pay", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

app.post("/pay", async (req, res) => {
  const { userSignedTransaction, id } = req.body;
  const transactionToSubmit = TransactionBuilder.fromXDR(
    userSignedTransaction,
    SERVER_URL
  );

  try {
    const transaction = transactionToSubmit._operations[0];
    const { type, address, data, price } = await getOriginal(id);
    if (transaction.destination != process.env.PUBLIC_KEY)
      throw new Error("Destination incorrect");
    if (Number(transaction.amount) != Number(price))
      throw new Error("Price incorrect");
    if (address) {
      try {
        await payClient(address, price);
      } catch (e) {
        console.log("Failed to pay client");
      }
    }
    res.send({
      type,
      data,
    });
  } catch (e) {
    res.send({ error: "Payment Failed" + e.message });
  }
});

async function getPreview(id) {
  const col = collection(db, "mysterious-elements");
  const query = await getDoc(doc(col, id));
  const data = query.data();
  if (data === undefined) return { error: "ID not found" };
  const { type, preview, price } = data;
  return { type, preview, price };
}

async function getOriginal(id) {
  const col = collection(db, "mysterious-elements");
  const query = await getDoc(doc(col, id));
  const data = query.data();
  return data;
}

async function saveToDb(params) {
  const { address, type, data, price } = params;
  let { preview } = params;
  if (isNaN(Number(price))) throw new Error("Price is not a number");
  if (Number(price) < 100) throw new Error("Price must be higher than 100");
  const col = collection(db, "mysterious-elements");
  if (type == "text") {
    const lorem = new LoremIpsum();
    preview = lorem.generateWords(data.split(" ").length);
  }
  const res = await addDoc(col, {
    address,
    type,
    data,
    preview,
    price,
  });
  return { id: res.id, preview };
}

async function payClient(address, price) {
  const sourceAccount = await server.loadAccount(process.env.PUBLIC_KEY);
  const fee = await server.fetchBaseFee();
  const amount = (Number(price) * 0.99 - fee).toString();
  if (amount <= 0) return;
  const tx = new TransactionBuilder(sourceAccount, {
    fee,
    networkPassphrase: "Test SDF Network ; September 2015",
  })
    .addOperation(
      Operation.payment({
        amount,
        asset: Asset.native(),
        destination: address,
      })
    )
    .setTimeout(60 * 10)
    .build();
  tx.sign(Keypair.fromSecret(process.env.SECRET_KEY));
  try {
    await server.submitTransaction(tx);
  } catch (e) {
    console.log("Payment failed");
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
