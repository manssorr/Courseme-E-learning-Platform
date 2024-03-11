import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "50%",
  width: "80%",
  margin: "auto",
  color: "#fff",
  textAlign: "center",
  lineHeight: "60px",
  backgroundColor: "rgba(0, 0, 0, .4)",
  minHeight: "150px"
};

const carousel = () => (
  <Carousel
    autoplay
    style={{
      background:
        "url('https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition:"center",
      height: "40vh",
    }}
    className="d-flex justify-content-center align-items-center"
  >
    <div>
      <h3 style={contentStyle}>
        The modern JavaScript course for everyone! Master JavaScript with
        projects, challenges and theory. Many courses in one!.
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        Learn modern HTML5, CSS3 and web design by building a stunning website
        for your portfolio! Includes flexbox and CSS Grid.
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        Learn A-Z everything about Python, from the basics, to advanced topics
        like Python GUI, Python Data Analysis, and more!.
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        Increase Your Data Analytic Skills – Highly Valued And Sought After By
        Employers
      </h3>
    </div>
  </Carousel>
);

export default carousel;
