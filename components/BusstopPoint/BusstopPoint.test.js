/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import BusstopPoint from "./index";

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

it("Renders a busstop point", () => {
  const stop = {
    stopId: 1,
    lat: 33.760262,
    lng: -84.384706,
    donationsRaisedInDollars: 0,
    name: "Hertz at Portman Blvd",
  };

  const latLongData = {
    minLat: 33.760262,
    maxLat: 33.760262,
    minLng: -84.384706,
    maxLng: -84.384706,
  };

  act(() => {
    render(
      <BusstopPoint
        stop={stop}
        latLongData={latLongData}
        setPopup={() => {}}
      />,
      container,
    );
  });
  expect(container.textContent).toBe("Hertz at Portman Blvd");
});
