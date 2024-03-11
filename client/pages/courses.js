import axios from "axios";
import { useState } from "react";
import CourseCard from "../components/cards/CourseCard";
import { Menu, Button, Select } from "antd";
import { cats } from "../utils/dummyData";
import FlitersBar from "../components/FiltersBar";
const { Option } = Select;

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        )
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item
          </a>
        )
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item
          </a>
        )
      }
    ]}
  />
);

const courses = ({ courses }) => {
  const [allData, setAllData] = useState(courses);
  // const filterOptions

  return (
    <>
      {/* Filters */}
      <FlitersBar courses={courses} allData={allData} setAllData={setAllData} />
      {/* Courses */}
      <div className="container">
        <div className="row">
          {allData.map((course) => (
            <div key={course._id} className="col-lg-3 col-md-6 col-sm-12">
              <CourseCard course={course} />
            </div>
          ))}
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
export default courses;
