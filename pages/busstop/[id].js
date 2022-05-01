import React from "react";
import Layout from "@components/Layout";
import DetailModule from "@components/DetailModule";
import { fetchOne } from "service/busstop";

const BusStopDonate = ({ busstopData }) => {
  return (
    <Layout>
      <DetailModule busstopData={busstopData} />
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
