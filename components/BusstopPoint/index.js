import React from "react";

const BusstopPoint = ({ stop, latLongData, setPopup }) => {
  const { minLat, maxLat, minLng, maxLng } = latLongData;

  const handleClick = () => {
    setPopup(stop.stopId);
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
    </li>
  );
};

export default BusstopPoint;
