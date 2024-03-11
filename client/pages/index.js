import React from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import { Row, Col } from "antd";
import { Paths } from "../utils/dummyData";
import Link from "next/link";
import Carousel from "../components/Carousel";
import PathsSection from "../components/PathsSection";

const Index = ({ courses }) => {
  // const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
  //   fetchCourses();
  // }, []);
  return (
    <>
      <Carousel />
      {/* Course Section */}
      <div className="container">
        <div className="row p-4">
          {courses.map((course) => (
            <div key={course._id} className="col-lg-3 col-md-6 col-sm-12 p-2">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
      {/* paths Section */}
      <div
        style={{
          backgroundColor: "#2d5ebe",
          marginBottom: "50px",
          padding: "30px"
        }}
      >
        {/* <PathsSection /> */}
        <div className="container">
          <h3 className="text-white">Learning Paths</h3>
          <Row gutter={[16, 16]}>
            {Paths.map((path, index) => (
              <div key={path.id} className="col-lg-4 col-md-6 col-sm-12">
                <Link href={`/paths/${index}`}>
                  <div
                    className="card m-2 p-2"
                    style={{
                      alignItems: "center",
                      cursor: "pointer",
                      borderRadius: "10px"
                    }}
                  >
                    <h6 className="card-title m-2"> {path.title} </h6>
                  </div>
                </Link>
              </div>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data
    }
  };
}

// export function getAllPathIds() {
//   return  Paths.map(path => {
//     const pathId = path.id;
//     return {
//       params: { id }
//     }
//   })
// }

// export function getAllData(pathId, { params }) {
//   return {
//     page: pathId,
//     query: params,
//   }
// }

export default Index;
