import { render } from "preact";
import { App } from "./app";
import { NextUIProvider } from "@nextui-org/react";

import "./index.css";

render(
  <NextUIProvider>
    <App />
  </NextUIProvider>,
  document.getElementById("app")
);
