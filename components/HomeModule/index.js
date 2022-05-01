import BusstopPoint from "@components/BusstopPoint";
import ClickOutside from "@lib/click-outsite";
import Link from "next/link";
import { donationGoalInDollars } from "pages";
import React, { useState, useEffect } from "react";
import { fetchPage } from "service/busstop";

const HomeModule = () => {
  const [busstops, setBusstops] = useState({
    data: [],
    pagination: {},
    status: "initialized", // initialized, success, error
    message: "",
  });
  const [popup, setPopup] = useState(null);

  const currentPage = busstops.pagination?.currentPage || 0;

  useEffect(() => {
    const data = fetchPage(currentPage, 10);
    setBusstops(data);
  }, [currentPage]);

  const minLat = busstops.data.reduce((min, stop) => {
    return Math.min(min, stop.lat);
  }, Infinity);
  const maxLat = busstops.data.reduce((max, stop) => {
    return Math.max(max, stop.lat);
  }, -Infinity);
  const minLng = busstops.data.reduce((min, stop) => {
    return Math.min(min, stop.lng);
  }, Infinity);
  const maxLng = busstops.data.reduce((max, stop) => {
    return Math.max(max, stop.lng);
  }, -Infinity);

  const latLongData = {
    minLat,
    maxLat,
    minLng,
    maxLng,
  };

  return (
    <>
      <div className="pb-16">
        <div className="py-6 mx-auto">
          <h1 className="h1 text-center mb-8">
            Contribute to Your Local Busstop
          </h1>
          <p className="body text-center text-h3 text-black80">
            Find the busstop you want to contribute in the map.
          </p>
        </div>
        {busstops.status === "error" ? (
          <div>
            <h1 className="h2 text-center">
              We&apos;re having a problem currently, please try again later.
            </h1>
          </div>
        ) : (
          <div>
            <div className="my-8 text-center">
              <h3>Click on the busstop to donate to.</h3>
            </div>
            <div className="h-[800px] w-[800px] p-[120px] mx-auto bg-brown-med bg-[url('/map.png')] bg-cover">
              <div className="mx-auto relative h-full">
                <ul className="h-full">
                  {busstops.data.map((stop) => (
                    <BusstopPoint
                      key={stop.stopId}
                      stop={stop}
                      latLongData={latLongData}
                      setPopup={setPopup}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      {popup && (
        <div className="w-screen h-screen bg-black50 fixed left-0 top-0">
          <ClickOutside
            onClick={() => {
              setPopup(null);
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="rounded-md border-2 border-solid bg-black border-black w-80 p-4 flex justify-center flex-col items-center text-center">
                <p className="text-white text-2xl">
                  Busstop name:{busstops.data[popup].name}
                </p>
                <p className="text-white text-base">
                  Donations Collected: $
                  {busstops.data[popup].donationsRaisedInDollars} / $
                  {donationGoalInDollars}
                </p>
                <Link href={`/busstop/${busstops.data[popup].stopId}`}>
                  <a className="inline-block border-solid border-2 border-white rounded-lg text-white p-2 my-4 w-1/2">
                    Donate
                  </a>
                </Link>
              </div>
            </div>
          </ClickOutside>
        </div>
      )}
    </>
  );
};

export default HomeModule;
