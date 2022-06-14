import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  styled,
  Image,
  Container,
  Spacer,
} from "@nextui-org/react";
import { Pixelify } from "react-pixelify";
import { useState, useRef } from "preact/hooks";
import { api } from "../services/api";
import { primaryGradientColor } from "../constants";

export const FormModal = ({
  open,
  onClose,
  setHash,
  onSuccess,
  type,
  setType,
}) => {

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null)
  const [inputRange, setInputRange] = useState(5);
  const [formData, setFormData] = useState({
    address: "",
    type,
    price: "",
    data: "",
    preview: "",
  });

  const inputRef = useRef(null);
  const pixelImgRef = useRef(null);

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
          width: "100%"
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
      {/* <Spacer />
      <Input  // TODO Implement this
        label="Or enter image URL"
        color="secondary"
        css={{border: "1px solid violet", display: image && "none"}}
        fullWidth
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      /> */}

      {image && (
        <>
          <Label>
            Original Image
            <Image src={image} />
          </Label>
          <Label>
            How pixelated do you want it?
            <input
              type="range"
              onChange={(e) => setInputRange(e.target.value)}
              step="1"
              min="5"
              max="50"
            />
          </Label>
          <Label>
            Resultant Image
            <Pixelify
              src={image}
              pixelSize={inputRange}
              width={200}
              height={200}
              ref={pixelImgRef}
            />
          </Label>
        </>
      )}
    </Container>
  );
  const renderRadioButtons = () => (
    <Container display="flex" alignItems="center" justify="space-evenly">
      <p>Choose One</p>
      <input
        type="radio"
        value="image"
        name="option"
        defaultChecked={type === "image"}
        onChange={() => {
          setType("image");
          setFormData({ ...formData, type: "image" });
        }}
      />
      Image
      <input
        type="radio"
        value="text"
        name="option"
        defaultChecked={type === "text"}
        onChange={() => {
          setType("text");
          setFormData({ ...formData, type: "text" });
        }}
      />{" "}
      Text
    </Container>
  );
  const convertToBase64 = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.type === "image") {
      convertToBase64(image, (base64) => {
        const previewBase64 =
          pixelImgRef.current.canvas.toDataURL("image/jpeg");
        api
          .post("/save", {
            ...formData,
            data: base64,
            preview: previewBase64,
          })
          .then((res) => {
            setHash(res.data.id);
            onSuccess();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      api
        .post("/save", formData)
        .then((res) => {
          setHash(res.data.id);
          onSuccess();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
      <form>
        <Modal.Body>
          {renderRadioButtons()}
          {type === "image" ? (
            renderImageItems()
          ) : (
            <Input
              bordered
              color="secondary"
              size="lg"
              label="Text to encrypt"
              onChange={(e) =>
                setFormData({ ...formData, data: e.target.value })
              }
              value={type === "text" ? formData.data : ""}
            />
          )}

          <Input
            bordered
            color="secondary"
            size="lg"
            label="Public Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <Input
            bordered
            color="secondary"
            size="md"
            placeholder="$10"
            label="Price (higher than $100)"
            value={formData.price}
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
          />
        </Modal.Body>
      </form>
      <Modal.Footer>
        <Button auto bordered color="error" onClick={onClose}>
          Close
        </Button>
        <Button auto onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Label = styled("label", {
  display: "inline-block",
  padding: "6px",
  cursor: "pointer",
  borderRadius: "999px",
});
