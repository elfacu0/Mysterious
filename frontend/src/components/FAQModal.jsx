import {
  Modal,
  useModal,
  Button,
  Text,
  Grid,
  Collapse,
  Spacer,
} from "@nextui-org/react";
import { primaryGradientColor } from "../constants";

export const FAQModal = ({ open, onClose }) => {
  const FAQItems = [
    {
      question: "What is Mysterious?",
      answer:
        "Mysterious is a project where users can obfuscate images and/or texts and receive money from people who are willing to pay to reveal it through the Stellar BlockChain network. <br/> It uses a beautiful and simple UI/UX interface for any user, providing an infinity of utilities.",
    },
    {
      question: "How does it works?",
      answer:
        "After uploading an image or text, you will receive an HTML code along with a script that you need to insert into your web page. <br/> <br/> In this way, both the text and the image will be obfuscated and in case a customer wants to see the original content, they can make the payment with any of the wallets supported by Simple Signer, facilitating transactions.<br/> <br/> The payment will be made to the address provided by you. <br/> <br/> <a href='https://elfacu0.github.io/Mysterious/script/'> See Demo <a/>",
    },
    {
      question: "How much does it cost?",
      answer:
        "Mysterious takes 1% of the amount your clients pay. <b> You don't have to pay anything </b>.",
    },
  ];

  return (
    <Modal
      scroll
      width="60%"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeButton
      shadow
      open={open}
      onClose={onClose}
      blur
    >
      <Modal.Header>
        <Text id="modal-title" size={28}>
          How does{" "}
          <Text b size={35} css={{ textGradient: primaryGradientColor }}>
            Mysterious {""}
          </Text>
          work? FAQ
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container gap={2}>
          <Grid>
            <Collapse.Group splitted css={{ width: "100%" }}>
              {FAQItems.map(({ question, answer }, index) => (
                <Collapse title={question} key={index} css={{ width: "100%" }}>
                  <Text css={{ fontFamily: "Montserrat, sans-serif" }}>
                    <div dangerouslySetInnerHTML={{ __html: answer }} />
                  </Text>
                </Collapse>
              ))}
            </Collapse.Group>
          </Grid>
        </Grid.Container>
        <Text></Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto onClick={() => onClose()}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
