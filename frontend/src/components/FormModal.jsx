import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Textarea,
  styled,
} from "@nextui-org/react";
import { primaryGradientColor } from "../constants";

export const FormModal = ({ open, onClose }) => {
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      shadow
      open={open}
      onClose={onClose}
      blur
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to {""}
          <Text b size={18} css={{ textGradient: primaryGradientColor }}>
            Mysterious
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          bordered
          color="secondary"
          size="lg"
          label="Text to encrypt"
        />
        <Label>
          <Input
            type="file"
            id="file"
            placeholder="Password"
            css={{ d: "none" }}
          />
          Upload Image
        </Label>
        <Input
          bordered
          color="secondary"
          size="lg"
          label="Public Address"
        />
        <Input
          bordered
          color="secondary"
          size="md"
          placeholder="$10"
          label="Amount"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto bordered color="error" onClick={onClose}>
          Close
        </Button>
        <Button auto onClick={() => {}}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Label = styled("label", {
  display: "inline-block",
  padding: "6px 12px",
  cursor: "pointer",
  border: `1px solid violet`,
  borderRadius: "999px",
});
