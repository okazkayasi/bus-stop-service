import { donationGoalInDollars } from "@components/BusstopPoint";
import Layout from "@components/Layout";
import React from "react";
import { fetchOne } from "service/busstop";

const BusStopDonate = ({ busstopData }) => {
  console.log(busstopData, "data");
  const { data, status, message } = busstopData;
  return (
    <Layout>
      <div className="py-12">
        <h1 className="h2 text-center">{data.name}</h1>
        <div className="mx-auto border-black border-solid border-2 rounded-lg p-4 m-12">
          <h3 className="h3 text-center">
            Donations so far: {data.donationsRaisedInDollars}
          </h3>
          <h3 className="h3 text-center">
            Donations needed: {donationGoalInDollars}
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const busstopData = fetchOne(id);

  // Pass data to the page via props
  return { props: { busstopData } };
}

export default BusStopDonate;
