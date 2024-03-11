import { FaCookieBite, FaHandHoldingHeart } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { IconContext } from "react-icons";
import Button from "react-bootstrap/Button";
const policy = ({ courses }) => {
  return (
    <>
      <h1
        className=" text-left square container-fluid"
        style={{
          paddingTop: "50px",
          paddingBottom: "50px",
          backgroundColor: "#e3edff",
        }}
      >
        Our Policy
      </h1>
      <div className="container ">
        <div>
          <h5>
            Privacy Policy Courseme built the Courseme app as a Commercial app.
            This SERVICE is provided by Courseme and is intended for use as is.
          </h5>
          <h5>
            This page is used to inform visitors regarding our policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use our Service. If you choose to use our Service, then
            you agree to the collection and use of information in relation to
            this policy. The Personal Information that we collect is used for
            providing and improving the Service. We will not use or share your
            information with anyone except as described in this Privacy Policy.
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which are accessible at Courseme unless
            otherwise defined in this Privacy Policy. Information Collection and
            Use For a better experience, while using our Service, we may require
            you to provide us with certain personally identifiable information.
            The information that we request will be retained
          </h5>
        </div>
      </div>
      <div className="container">
        <div className="row " style={{ padding: "auto" }}>
          <IconContext.Provider
            value={{
              className: "global-class-name ",
              size: "90%",
              color: "#2D5EBE",
            }}
          >
            <Button
              variant="light"
              className="col m-5"
              href="/cookie"
              disabled
              style={{ borderColor: "#2D5EBE", borderRadius: "20px" }}
            >
              <FaCookieBite />
              <h4 className="text-dark">Cookie</h4>
            </Button>
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              className: "global-class-name",
              size: "90%",
              color: "#2D5EBE",
            }}
          >
            <Button
              variant="light"
              className="col m-5"
              href="/policy"
              style={{ borderColor: "#2D5EBE", borderRadius: "20px" }}
            >
              <MdPrivacyTip />
              <h4 className="text-dark">Privacy</h4>
            </Button>
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              className: "global-class-name",
              size: "90%",
              color: "#2D5EBE",
            }}
          >
            <Button
              variant="light"
              className="col m-5"
              href="/terms"
              style={{ borderColor: "#2D5EBE", borderRadius: "20px" }}
            >
              <FaHandHoldingHeart />
              <h4 className="text-dark">Terms</h4>
            </Button>
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
};
export default policy;
