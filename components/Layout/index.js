import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="bg-yellow min-h-screen">
      <div className="container">
        <Head>
          <title>Donate to Your Busstop</title>
          <meta
            name="description"
            content="Have a better busstop. Contribute to the society."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>{children}</main>

        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
