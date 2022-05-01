import HomeModule from "@components/HomeModule";
import React from "react";
import Layout from "../components/Layout";

export const donationGoalInDollars = 700;

export default function Home() {
  return (
    <Layout>
      <HomeModule />
    </Layout>
  );
}
