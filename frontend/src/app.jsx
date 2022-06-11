import { Button, styled, Container, Text } from "@nextui-org/react";

export function App() {
  return (
    <Container display="flex" direction="column">
      <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>
        Mysterious things are happening...
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
        <Button bordered color="primary" css={{ marginBottom: "2rem", fontSize: "1rem", color: "grey" }} shadow>
          Try it now
        </Button>
        <Button bordered color="warning" shadow>
          How does it works?
        </Button>
      </Container>
    </Container>
  );
}
