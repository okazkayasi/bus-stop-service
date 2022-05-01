import { donationGoalInDollars } from "@components/BusstopPoint";
import Layout from "@components/Layout";
import PaymentComponent from "@components/PaymentComponent";
import React, { useState } from "react";
import { fetchOne, donateToBusstop } from "service/busstop";

const BusStopDonate = ({ busstopData }) => {
  console.log(busstopData, "data");
  const { data, status, message } = busstopData;

  const [donationRaised, setDonationRaised] = useState(
    data.donationsRaisedInDollars,
  );
  const sendDonation = (number, cvc, expiry_date, value) => {
    const id = data.stopId;
    const {
      valueAdded,
      status,
      message: messageReturned,
    } = donateToBusstop(id, number, cvc, expiry_date, value);
    if (status === "success") {
      setDonationRaised(donationRaised + valueAdded);
      alert("Donation is added successfully.");
    } else if (status === "error") {
      alert(messageReturned);
    }
  };

  return (
    <Layout>
      <div className="py-12">
        <h1 className="h2 text-center">{data.name}</h1>
        <div className="mx-auto border-black border-solid border-2 rounded-lg p-4 m-12">
          <h3 className="h3 text-center">
            Donations so far: ${donationRaised || 0}
          </h3>
          <h3 className="h3 text-center">
            Donations needed: ${donationGoalInDollars}
          </h3>
        </div>
      </div>
      <PaymentComponent sendDonation={sendDonation} />
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
