import { Modal, useModal, Button, Text, Grid, Collapse } from "@nextui-org/react";
import { primaryGradientColor } from "../constants";

export const FAQModal = ({ open, onClose }) => {
  
  const FAQItems = [
    {
      question: "What is Mysterious?",
      answer: "Mysterious is a service that obfuscates images or texts and earns money for people to see it.",
    },
    {
      question: "How does it works?",
      answer: "Mysterious is a service that obfuscates images or texts and earns money for people to see it.",
    },
    {
      question: "How much does it cost?",
      answer: "Mysterious is a service that obfuscates images or texts and earns money for people to see it.",
    }
  ]

  return (
    <div>
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
              <Collapse.Group splitted css={{width: "100%"}}>
              {FAQItems.map(({ question, answer }, index) => (
                <Collapse title={question} key={index} css={{width: "100%"}}>
                  <Text>{answer}</Text>
                </Collapse>
               ))}
              </Collapse.Group>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={() => onClose()}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
