import BusstopPoint from "@components/BusstopPoint";
import React, { useState, useEffect } from "react";
import { fetchPage } from "service/busstop";
import Layout from "../components/Layout";

export default function Home() {
  const [busstops, setBusstops] = useState({
    data: [],
    pagination: {},
    status: "initialized", // initialized, success, error
    message: "",
  });

  const currentPage = busstops.pagination?.currentPage || 0;

  useEffect(() => {
    const data = fetchPage(currentPage, 10);
    setBusstops(data);
  }, [currentPage]);

  console.log(busstops);
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
    <Layout>
      <div className="pb-16">
        <div className="py-6 w-1/2 mx-auto">
          <h1 className="h1 text-center mb-8">
            Contribute to Your Local Busstop
          </h1>
          <p className="body text-center text-h3 text-black80">
            Find the busstop you want to contribute in the map.
          </p>
        </div>
        <div className="my-8 text-center">
          <h3>Click on the busstop to donate to.</h3>
        </div>
        <div className="h-[750px] w-[750px] p-[75px] bg-white mx-auto">
          <div className="mx-auto relative h-full bg-white">
            <ul className="h-full">
              {busstops.data.map((stop) => (
                <BusstopPoint
                  key={stop.stopId}
                  stop={stop}
                  latLongData={latLongData}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
