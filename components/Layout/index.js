import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
};

export default Layout;
