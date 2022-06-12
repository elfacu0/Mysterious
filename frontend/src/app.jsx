/* eslint-disable linebreak-style */
import { useState } from "preact/hooks";
import { Button, styled, Container, Text } from "@nextui-org/react";
import { FormModal } from "./components/FormModal";
import { primaryGradientColor } from "./constants";
import { FAQModal } from "./components/FAQModal";
import { SuccessFormModal } from "./components/SuccessFormModal";

export function App() {
  const [hash, setHash] = useState(null);
  const [openFAQModal, setOpenFAQModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const onSuccessFormModal = () => {
    setOpenFormModal(false);
    setOpenSuccessModal(true);
  };

  const renderFormModal = () => (
    <FormModal
      open={openFormModal}
      onClose={() => setOpenFormModal(false)}
      onSuccess={onSuccessFormModal}
      setHash={setHash}
    />
  );

  const renderFAQModal = () => (
    <FAQModal open={openFAQModal} onClose={() => setOpenFAQModal(false)} />
  );

  const renderSuccessModal = () => (
    <SuccessFormModal
      open={openSuccessModal}
      onClose={() => setOpenSuccessModal(false)}
      hash={hash}
    />
  );

  return (
    <Container display="flex" direction="column">
      <Text
        h1
        css={{
          textGradient: primaryGradientColor,
          fontSize: "4rem",
        }}
      >
        Mysterious
      </Text>
      <Text h3 color="white">
        Obfuscate images or texts and earn money for people to see it
      </Text>

      <Container
        fluid
        display="flex"
        justify="center"
        direction="column"
        css={{
          marginTop: "4rem",
        }}
      >
        <Button
          bordered
          color="primary"
          css={{ marginBottom: "2rem", fontSize: "1rem", color: "grey" }}
          shadow
          onPress={() => setOpenFormModal(true)}
        >
          Try it now
        </Button>
        <Button
          bordered
          color="warning"
          shadow
          onPress={() => setOpenFAQModal(true)}
        >
          How does it works?
        </Button>
      </Container>
      {hash && renderSuccessModal()}
      {openFormModal && renderFormModal()}
      {openFAQModal && renderFAQModal()}
    </Container>
  );
}
