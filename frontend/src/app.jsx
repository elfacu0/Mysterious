/* eslint-disable linebreak-style */
import { useState } from "preact/hooks";
import { Button, styled, Container, Text } from "@nextui-org/react";
import { FormModal } from "./components/FormModal";
import { primaryGradientColor } from "./constants";
import { FAQModal } from "./components/FAQModal";

export function App() {
  const [openFAQModal, setOpenFAQModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  const renderFormModal = () => (
    <FormModal open={openFormModal} onClose={() => setOpenFormModal(false)} />
  );

  const renderFAQModal = () => (
    <FAQModal open={openFAQModal} onClose={() => setOpenFAQModal(false)} />
  )

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
      {renderFormModal()}
      {renderFAQModal()}
    </Container>
  );
}
