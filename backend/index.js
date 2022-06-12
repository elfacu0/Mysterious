require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const { initializeApp } = require("firebase/compat/app");
const {
  getFirestore,
  collection,
  getDoc,
  doc,
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

app.get("/", (req, res) => {
  res.send("Nothing to see here...");
});

app.get("/preview/:id", async (req, res) => {
  const preview = await getPreview(req.params.id);
  res.send(preview);
});

app.get("/payment", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

app.post("/payment", async (req, res) => {
  const { userSignedTransaction, id } = req.body;
  const transactionToSubmit = TransactionBuilder.fromXDR(
    userSignedTransaction,
    SERVER_URL
  );

  try {
    const transaction = transactionToSubmit._operations[0];
    const { type, data, price } = await getOriginal(id);
    if (transaction.destination != process.env.DESTINATION_PUBLIC_KEY)
      throw new Error("Destination incorrect");
    if (transaction.amount != price) throw new Error("Price incorrect");
    res.send({
      type,
      data,
    });
  } catch (e) {
    res.send({ error: "Payment Failed" + e });
  }
});

async function getPreview(id) {
  const col = collection(db, "mysterious-elements");
  const query = await getDoc(doc(col, id));
  const data = query.data();
  const { preview, price } = data;
  const res = { preview, price };
  return res;
}

async function getOriginal(id) {
  const col = collection(db, "mysterious-elements");
  const query = await getDoc(doc(col, id));
  const data = query.data();
  return data;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
