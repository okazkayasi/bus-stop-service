import ClickOutside from "@lib/click-outsite";
import Link from "next/link";
import React, { useState } from "react";

export const donationGoalInDollars = 700;

const BusstopPoint = ({ stop, latLongData }) => {
  const [tooltipOn, setTooltipOn] = useState(false);
  const { minLat, maxLat, minLng, maxLng } = latLongData;

  const handleClick = () => {
    setTooltipOn((tooltipOn) => !tooltipOn);
  };

  return (
    <li
      onClick={handleClick}
      className="absolute w-4 rounded-full h-4 bg-black -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        left: `${(100 * (stop.lat - minLat)) / (maxLat - minLat)}%`,
        top: `${(100 * (stop.lng - minLng)) / (maxLng - minLng)}%`,
      }}
    >
      <p className="my-3 ml-3 w-60 relative">{stop.name}</p>
      {tooltipOn && (
        <ClickOutside
          onClick={() => {
            setTooltipOn(false);
          }}
        >
          <div className="absolute rounded-md border-2 border-solid bg-black border-black w-80 p-4 bottom-2 left-4 z-20">
            <p className="text-white text-2xl">Busstop name:{stop.name}</p>
            <p className="text-white text-base">
              Donations Collected: ${stop.donationsRaisedInDollars} / $
              {donationGoalInDollars}
            </p>
            <Link href={`/busstop/${stop.stopId}`}>
              <a className="inline-block border-solid border-2 border-white rounded-lg text-white p-2 my-4">
                Donate
              </a>
            </Link>
          </div>
        </ClickOutside>
      )}
    </li>
  );
};

export default BusstopPoint;
