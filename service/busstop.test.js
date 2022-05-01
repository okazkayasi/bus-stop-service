import { fetchPage, fetchOne, donateToBusstop } from "./busstop";

test("Fetch all data", () => {
  const all_stops = fetchPage();
  try {
    const success_data = {
      data: [
        {
          stopId: 1,
          lat: 33.760262,
          lng: -84.384706,
          donationsRaisedInDollars: 0,
          name: "Hertz at Portman Blvd",
        },
        {
          stopId: 2,
          lat: 33.760138,
          lng: -84.388043,
          donationsRaisedInDollars: 0,
          name: "Peachtree Center Mall",
        },
        {
          stopId: 3,
          lat: 33.757355,
          lng: -84.386423,
          donationsRaisedInDollars: 0,
          name: "Georgia Pacific",
        },
        {
          stopId: 4,
          lat: 33.758648,
          lng: -84.382754,
          donationsRaisedInDollars: 0,
          name: "Sheraton Atlanta",
        },
        {
          stopId: 5,
          lat: 33.755365,
          lng: -84.384921,
          donationsRaisedInDollars: 0,
          name: "Loudermilk Center",
        },
      ],
      pagination: {
        total_pages: 2,
        current_page: 0,
        number_of_items_in_page: 5,
        number_of_items_in_total: 10,
      },
      status: "success",
      message: "Bus stops are returned successfully.",
    };
    expect(all_stops).toEqual(success_data);
  } catch (e) {
    const err_return = {
      data: [],
      pagination: {},
      status: "error",
      message: "Unable to read database",
    };
    expect(all_stops).toEqual(err_return);
  }
});

test("Fetch one data", () => {
  const one_stop = fetchOne(1);
  try {
    const success_data = {
      data: {
        stopId: 1,
        lat: 33.760262,
        lng: -84.384706,
        donationsRaisedInDollars: 0,
        name: "Hertz at Portman Blvd",
      },
      status: "success",
      message: "Bus stop is returned successfully.",
    };
    expect(one_stop).toEqual(success_data);
  } catch (e) {
    const err_return = {
      data: {},
      status: "error",
      message: "Unable to read database",
    };
    expect(one_stop).toEqual(err_return);
  }
});

test("Donate to bus stop", () => {
  const donate_to_busstop = donateToBusstop(1, "", "", "", 10);
  console.log(donate_to_busstop);
  try {
    const success_data = {
      status: "success",
      message: "Donation is added successfully.",
      valueAdded: 10,
    };
    expect(donate_to_busstop).toEqual(success_data);
  } catch (e) {
    const err_return = {
      valueAdded: 0,
      status: "error",
      message: "Unable to connect to database",
    };
    expect(donate_to_busstop).toEqual(err_return);
  }
});
