import React, { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <div>{children}</div>
      <Footer />
    </Fragment>
  );
}
