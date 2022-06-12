import { render } from "preact";
import { App } from "./app";
import { createTheme, grayDark, NextUIProvider } from "@nextui-org/react";

import "./index.css";

render(
  <NextUIProvider theme={createTheme({type: "dark"})}>
    <App />
  </NextUIProvider>,
  document.getElementById("app")
);
