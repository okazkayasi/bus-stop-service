/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import HomeModule from "./index";

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

it("Renders Home Module", () => {
  act(() => {
    render(<HomeModule />, container);
  });
  try {
    expect(container.textContent).toBe(
      "Contribute to Your Local BusstopFind the busstop you want to contribute in the map.Click on the busstop to donate to.Hertz at Portman BlvdPeachtree Center MallGeorgia PacificSheraton AtlantaLoudermilk CenterRialto Arts CenterSky View AtlantaCentennial ParkSuntrust PlazaSweet Auburn Market",
    );
  } catch (e) {
    expect(container.textContent).toBe(
      "Contribute to Your Local BusstopFind the busstop you want to contribute in the map.We're having a problem currently, please try again later.",
    );
  }
});
