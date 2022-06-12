import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Textarea,
  styled,
  Image,
  Container,
  Radio,
  Spacer,
} from "@nextui-org/react";
import { Pixelify } from "react-pixelify";
import { useState, useRef } from "preact/hooks";
import { primaryGradientColor } from "../constants";

export const FormModal = ({ open, onClose }) => {
  const [image, setImage] = useState(null);
  const [inputRange, setInputRange] = useState(5);
  const [radioSelected, setRadioSelected] = useState("image");

  const inputRef = useRef(null);

  const handleInputChange = (file) => {
    if (file.target.files[0]) {
      setImage(URL.createObjectURL(file.target.files[0]));
    } else {
      setImage(null);
    }
  };

  const renderImageItems = () => (
    <Container dir="column" justify="center" align="center">
      <Label
        css={{
          border: image ? "1px solid green" : `1px solid violet`,
        }}
      >
        <Input
          type="file"
          id="file"
          placeholder="Password"
          css={{ d: "none" }}
          onChange={handleInputChange}
          ref={inputRef}
          accept="image/*"
        />
        Upload Image
      </Label>

      {image && (
        <>
          <Label>
            Original Image
            <Image src={image} />
          </Label>
          <input
            type="range"
            onChange={(e) => setInputRange(e.target.value)}
            step="1"
            min="5"
            max="50"
          />
          <Label>
            Resultant Image
            <Pixelify src={image} pixelSize={inputRange} />
          </Label>
        </>
      )}
    </Container>
  );

  const renderRadioButtons = () => (
    <Container>
      <p>Choose One</p>
      <input
        type="radio"
        value="image"
        name="option"
        defaultChecked={radioSelected === "image"}
        onChange={() => setRadioSelected("image")}
      />{" "}
      Image
      <Spacer />
      <input
        type="radio"
        value="text"
        name="option"
        defaultChecked={radioSelected === "text"}
        onChange={() => setRadioSelected("text")}
      />{" "}
      Text
    </Container>
  );

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
        {renderRadioButtons()}
        {radioSelected === "image" ? (
          renderImageItems()
        ) : (
          <Textarea
            bordered
            color="secondary"
            size="lg"
            label="Text to encrypt"
          />
        )}

        <Input bordered color="secondary" size="lg" label="Public Address" />
        <Input
          bordered
          color="secondary"
          size="md"
          placeholder="$10"
          label="Price"
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
  borderRadius: "999px",
});
