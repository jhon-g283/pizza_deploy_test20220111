import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

console.log("clientWidth:" + document.body.clientWidth);
console.log("offsetWidth:" + document.body.offsetWidth); //   var b = document.body.offsetWidth;

console.log("clientHeight:" + document.body.clientHeight);
console.log("offsetHeight:" + document.body.offsetHeight);
console.log("window.innerHeight:" + window.innerHeight);
console.log("window.innerWidth:" + window.innerWidth);

var window_width = {
  clientWidth: document.body.clientWidth,
  offsetWidth: document.body.offsetWidth,
  clientHeight: document.body.clientHeight,
  offsetHeight: document.body.offsetHeight,
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth
};

console.log(window_width);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App width_height={window_width} />
  </StrictMode>,
  rootElement
);
