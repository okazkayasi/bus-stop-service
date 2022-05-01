/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import PaymentComponent from "./index";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders Payment Component", () => {
  act(() => {
    render(<PaymentComponent />, container);
  });

  expect(container.textContent).toBe(
    "Card DetailsNameEmail (optional)Card NumberCVCExpiry DateDonation AmountDonate",
  );
});
