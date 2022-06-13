const sdk = /** @type {import("stellar-sdk")} */ (window.StellarSdk);
const { Keypair, Asset, Server, TransactionBuilder, Operation } = sdk;
const server = new Server("https://horizon-testnet.stellar.org");

const DESTINATION_KEY =
  "GCOLLSHCLGKIAI2QAM4HDKCQQUWBR4KTC2FMAIUJYIYPF7QFOTBB4EUU";
const API_URL = "https://solar-heliotrope-protest.glitch.me";
//Object oriented programs are offered as alternatives to correct ones
class Mysterious {
  constructor() {
    this.mysteriousImages = [];
    this.mysteriousTexts = [];
    this.simpleSigner = new SimpleSigner();
  }

  parse() {
    this.parseMysteriousImages();
    this.previewMysteriousImages();

    this.parseMysteriousTexts();
    this.previewMysteriousTexts();
  }

  parseMysteriousImages() {
    const mis = document.querySelectorAll(".mysterious-image");
    mis.forEach((mi) => {
      const id = mi.dataset.hashId;
      const miInstance = new MysteriousImage(mi, id, this.handlePay.bind(this));
      this.mysteriousImages.push(miInstance);
    });
  }

  previewMysteriousImages() {
    this.mysteriousImages.forEach((mi) => {
      mi.createPreview();
    });
  }

  parseMysteriousTexts() {
    const mis = document.querySelectorAll(".mysterious-text");
    mis.forEach((mi) => {
      const id = mi.dataset.hashId;
      const miInstance = new MysteriousText(mi, id, this.handlePay.bind(this));
      this.mysteriousTexts.push(miInstance);
    });
  }

  previewMysteriousTexts() {
    this.mysteriousTexts.forEach((mi) => {
      mi.createPreview();
    });
  }

  async handlePay(el) {
    el.showLoading();
    try {
      const userSignedTransaction = await this.simpleSigner.createPayment(
        el.data.price,
        DESTINATION_KEY
      );
      const id = el.id;
      const res = await fetch(`${API_URL}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userSignedTransaction,
          id,
        }),
      });
      const data = await res.json();
      if (data) {
        el.reveal(data.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}
class MysteriousElement {
  constructor(parent, id, handlePay) {
    this.parent = parent;
    this.id = id;
    this.handlePay = handlePay;
    this.data = {};
  }

  async getData() {
    const res = await fetch(`${API_URL}/preview/${this.id}`);
    const data = await res.json();
    return data;
  }

  async createPreview() {
    if (this.data.preview === undefined) {
      this.data = await this.getData();
    }
    const preview = this.data.preview;
    this.addStyles();
    this.showPreview(preview);
    this.addButton();
  }

  addStyles() {
    this.parent.style.cssText =
      "position: relative;display: flex;align-items: center; justify-content: center;max-height: 100%;max-width: 100%;";
  }

  addButton() {
    const parent = this.parent;
    const button = document.createElement("button");
    button.innerText = "Pay to see";
    button.style.cssText =
      "width: 100px;height: 40px;border-radius: 50px;background-color: #16181b;border: 1px solid violet;color: white;position: absolute;z-index: 1;max-width: 100%;max-height: 100%;";
    button.addEventListener(
      "mouseenter",
      (e) => {
        e.target.style.cursor = "pointer";
      },
      false
    );
    button.onclick = () => this.handlePay(this);
    parent.appendChild(button);
  }

  showLoading() {}
}

class MysteriousImage extends MysteriousElement {
  showPreview(preview) {
    this.addImage(preview);
  }

  reveal(imgSrc) {
    const parent = this.parent;
    parent.innerHTML = "";
    this.addImage(imgSrc);
  }

  addImage(imgSrc) {
    const parent = this.parent;
    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.cssText = "max-width: 100%;max-height: 100%;";
    parent.appendChild(img);
  }
}

class MysteriousText extends MysteriousElement {
  showPreview(preview) {
    this.addText(preview);
  }

  reveal(text) {
    const parent = this.parent;
    parent.innerHTML = "";
    this.addText(text);
  }

  addText(text) {
    const parent = this.parent;
    const txt = document.createElement("span");
    txt.textContent = text;
    parent.appendChild(txt);
  }
}

class SimpleSigner {
  constructor() {
    window.addEventListener("message", this.handleLogin.bind(this));
    window.addEventListener("message", this.handleSignTransaction.bind(this));
    this.publicKey = "";
    this.signedTransaction = "";
    this.SIMPLE_SIGNER_URL = "https://sign-test.plutodao.finance";
  }

  async createPayment(amount, destination) {
    this.signedTransaction = "";
    if (this.publicKey === "") {
      this.openConnectWindow();
      try {
        await this.waitForPublickKey();
      } catch {
        // show error;
        console.log("error when creating payment");
        return;
      }
    }
    const unsignedXdr = await this.createXdr(amount, destination);
    try {
      await this.signTransaction(unsignedXdr);
    } catch {
      // show error;
      return;
    }
    return this.signedTransaction;
  }

  openConnectWindow() {
    window.open(
      `${this.SIMPLE_SIGNER_URL}/connect`,
      "Connect_Window",
      "width=360, height=450"
    );
  }

  handleLogin(e) {
    if (e.origin !== `${this.SIMPLE_SIGNER_URL}`) {
      return;
    }
    const messageEvent = e.data;
    if (messageEvent.type === "onConnect") {
      const pkey = messageEvent.message.publicKey;
      if (StellarSdk.Keypair.fromPublicKey(pkey)) {
        this.publicKey = pkey;
      }
    }
  }

  async createXdr(amount, destination) {
    const sourceAccount = await server.loadAccount(this.publicKey);
    const tx = new TransactionBuilder(sourceAccount, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: "Test SDF Network ; September 2015",
    })
      .addOperation(
        Operation.payment({
          amount,
          asset: Asset.native(),
          destination,
        })
      )
      .setTimeout(60 * 10)
      .build();
    return tx.toXDR();
  }

  async signTransaction(unsignedXdr) {
    window.open(
      `${this.SIMPLE_SIGNER_URL}/sign?xdr=${unsignedXdr}`,
      "Sign_Window",
      "width=360, height=700"
    );
    try {
      await this.waitForSignedTransaction();
    } catch {
      //show error
      console.log("ERROR when signing transaction");
      return;
    }
  }

  async handleSignTransaction(e) {
    if (e.data.type === "onSign" && e.data.page === "sign") {
      const eventMessage = e.data;
      this.signedTransaction = eventMessage.message.signedXDR;
    }
  }

  waitForSignedTransaction() {
    return new Promise((resolve, reject) => {
      let cont = 0;
      const interval = setInterval(() => {
        cont++;
        if (this.signedTransaction) {
          clearInterval(interval);
          resolve(this.signedTransaction);
        }
        if (cont > 100) {
          clearInterval(interval);
          reject("TIME OUT");
        }
      }, 1000);
    });
  }

  waitForPublickKey() {
    return new Promise((resolve, reject) => {
      let cont = 0;
      const interval = setInterval(() => {
        cont++;
        if (this.publicKey) {
          clearInterval(interval);
          resolve(this.publicKey);
        }
        if (cont > 100) {
          clearInterval(interval);
          reject("TIME OUT");
        }
      }, 1000);
    });
  }
}

const mysterious = new Mysterious();
mysterious.parse();
