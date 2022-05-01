import Layout from "@components/Layout";
import PaymentComponent from "@components/PaymentComponent";
import Link from "next/link";
import { donationGoalInDollars } from "pages";
import React, { useState } from "react";
import { fetchOne, donateToBusstop } from "service/busstop";

const BusStopDonate = ({ busstopData }) => {
  const { data, status } = busstopData;

  const [donationRaised, setDonationRaised] = useState(
    data.donationsRaisedInDollars,
  );
  const sendDonation = (number, cvc, expiry_date, value) => {
    const id = data.stopId;
    const { valueAdded, status } = donateToBusstop(
      id,
      number,
      cvc,
      expiry_date,
      value,
    );
    if (status === "success") {
      setDonationRaised(donationRaised + valueAdded);
      alert("Donation is added successfully.");
    } else if (status === "error") {
      alert("We couldn't process your payment. Please try again later.");
    }
  };

  if (status === "error") {
    return (
      <Layout>
        <div className="pt-12">
          <h1 className="h2 text-center">
            We&apos;re having a problem currently, please try again later.
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <Link href="/" as="/" passHref>
          <a>
            <p className="small">{"<- Homepage"}</p>
          </a>
        </Link>
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
