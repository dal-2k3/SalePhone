import React, { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
export default function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <div>{children}</div>
      <ScrollToTop></ScrollToTop>
      <Footer />
    </Fragment>
  );
}
