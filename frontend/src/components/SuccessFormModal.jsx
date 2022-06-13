import { Modal, Button, Text, Grid, Collapse } from "@nextui-org/react";
import { primaryGradientColor } from "../constants";

export const SuccessFormModal = ({ open, onClose, hash }) => {
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
          <Text b size={35} css={{ textGradient: primaryGradientColor }}>
            Success! {""}
          </Text>
          Use the following code:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <code>
          <Text as="h4" color="white">
            {`<div class="mysterious-text" data-hash-id="${hash}"></div>`}{" "}
          </Text>
        </code>

        <Text>
          Dont forget to add the script{" "}
          <a href="https://cdn.jsdelivr.net/gh/OLucho/Mysterious/script/main.js" target="_blank">
            Link
          </a>
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto onClick={() => onClose()}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
