import { useState, useEffect, useContext } from "react";

import { Context } from "../context";
import { useRouter } from "next/router";

const Footer = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <footer
      className="sticky-bottom p-5   "
      style={{ backgroundColor: "#2d5ebe", padding: "1.5%", marginTop: "5%" }}
    >
      <div className="container-fluid ">
        <div className="row">
          <div className="col">
            <a href="/" className="text-white">
              <h4 className="text-white">Courseme</h4>
            </a>
            <h6>@ 2022 Courseme</h6>
          </div>
          <div className="col-10 ">
            <div className="container">
              <div className="row row-cols-3">
                <li className="col navbar">
                  <a className="text-white" href="/about">
                    About us
                  </a>
                </li>
                <li className="col navbar">
                  <a className="text-white" href="/policy">
                    Privacy Policy
                  </a>
                </li>
                <li className="col navbar">
                  <a className="text-white" href="/terms">
                    Terms
                  </a>
                </li>
                <li className="col navbar">
                  <a className="text-white" href="#">
                    Membership
                  </a>
                </li>
                <li className="col navbar">
                  <a className="text-white" href="#">
                    Contact Us
                  </a>
                </li>
                <li className="col navbar">
                  <a className="text-white" href="#">
                    Become a Partner
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
