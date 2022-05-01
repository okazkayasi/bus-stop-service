import { BusStopService } from "../BusStopService";

const service = new BusStopService();

const paginate = (all_stops, page, numberOfItemsInPage, searchInput) => {
  const start_ind = page * numberOfItemsInPage;
  const end_ind = start_ind + numberOfItemsInPage;
  const filtered_stops = searchInput
    ? all_stops.filter((stop) => {
        return stop.name.toLowerCase().includes(searchInput.toLowerCase());
      })
    : all_stops;

  if (filtered_stops && filtered_stops.length > start_ind) {
    return {
      data: filtered_stops.slice(start_ind, end_ind),
      pagination: {
        total_pages: Math.ceil(filtered_stops.length / numberOfItemsInPage),
        current_page: page,
        number_of_items_in_page: numberOfItemsInPage,
        number_of_items_in_total: filtered_stops.length,
      },
      status: "success",
      message: "Bus stops are returned successfully.",
    };
  }
  return [];
};

export const fetchPage = (
  page = 0,
  numberOfItemsInPage = 5,
  searchInput = "",
) => {
  try {
    const all_stops = service.getAllStops();
    return paginate(all_stops, page, numberOfItemsInPage, searchInput);
  } catch (e) {
    return {
      data: [],
      pagination: {},
      status: "error",
      message: e.message,
    };
  }
};

export const fetchOne = (id) => {
  try {
    const all_stops = service.getAllStops();
    const my_stop = all_stops.find((s) => s.stopId === parseInt(id));
    return {
      data: my_stop,
      status: "success",
      message: "Bus stop is returned successfully.",
    };
  } catch (e) {
    return {
      data: {},
      status: "error",
      message: e.message,
    };
  }
};

export const donateToBusstop = (id, number, cvc, expiryDate, value) => {
  try {
    service.addDonation(id, value);
    return {
      status: "success",
      message: "Donation is added successfully.",
      valueAdded: value,
    };
  } catch (e) {
    return {
      valueAdded: 0,
      status: "error",
      message: e.message,
    };
  }
};
