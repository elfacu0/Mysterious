require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

// const firebase = require('firebase');

const sdk = require("stellar-sdk");
const { Keypair, Asset, Server, TransactionBuilder, Operation } = sdk;
const SERVER_URL =
  process.env.SERVER_URL || "https://horizon-testnet.stellar.org";

app.get("/", (req, res) => {
  res.send("Nothing to see here...");
});

app.get("/preview/:id", (req, res) => {
  const preview = getPreview(req.params.id);
  res.send(preview);
});

app.get("/payment", function (req, res) {
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
    const { price, type, data } = await getOriginal(id);
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

function getPreview(id) {
  return {
    price: 100,
    type: "image",
    preview: "https://argentinaprograma.com/static/media/logo.b70109da.jpg",
  };
}

function getOriginal(id) {
  return {
    price: 100,
    type: "image",
    preview: "https://argentinaprograma.com/static/media/logo.b70109da.jpg",
  };
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
