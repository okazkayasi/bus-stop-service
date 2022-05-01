/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import DetailModule from "./index";

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

it("Renders Detail Module with Data", () => {
  const busstopData = {
    data: {
      stopId: 1,
      lat: 33.760262,
      lng: -84.384706,
      donationsRaisedInDollars: 0,
      name: "Hertz at Portman Blvd",
    },
    status: "success",
  };
  act(() => {
    render(<DetailModule busstopData={busstopData} />, container);
  });
  expect(container.textContent).toBe(
    "<- HomepageHertz at Portman BlvdDonations so far: $0Donations needed to meet the goal: $700Total donations needed: $700Card DetailsNameEmail (optional)Card NumberCVCExpiry DateDonation AmountDonate",
  );
});
it("Renders Detail Module with Error", () => {
  const busstopData = {
    data: {},
    status: "error",
  };
  act(() => {
    render(<DetailModule busstopData={busstopData} />, container);
  });
  expect(container.textContent).toBe(
    "We're having a problem currently, please try again later.",
  );
});
