import { useState, useEffect } from "react";
import axios from "axios";
import AdminRoute from "../../components/routes/AdminRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CoursesTable from "./courses/CoursesTable";

export default function AdminIndex() {
  const [courses, setCourses] = useState([]);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    loadCourses();
  }, [reFetch]);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/admin/all-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  /*
    name: "Test course 2"
    category: "machine"
    createdAt: "2022-06-05T00:51:43.169Z"
    description: "Test course "
    image: {ETag: '"17870c4989078cc744c259f3d8672469"', Location: 'https://coursemebucket.s3.amazonaws.com/kNEWtXbz010iM8o2sE6yy.jpeg', key: 'kNEWtXbz010iM8o2sE6yy.jpeg', Key: 'kNEWtXbz010iM8o2sE6yy.jpeg', Bucket: 'coursemebucket'}
    instructor: "629bf5fe4c41f2484c36e5e5"
    lessons: (5) [{…}, {…}, {…}, {…}, {…}]
    paid: true
    price: 10.99
    published: true
    slug: "test-course-2"
    updatedAt: "2022-06-05T00:52:18.700Z"
    __v: 0
    _id: "629bfe1f4c41f2484c36e656"
  */

  return (
    <AdminRoute>
      <h1
        style={{
          backgroundImage: "linear-gradient(to right, #f6d365 0%, #fda085 100%)"
        }}
        className=" jumbotron text-center square"
      >
        Admin Dashboard | Courses Manager 📚
      </h1>

      <CoursesTable
        tableData={courses}
        type="courses"
        setReFetch={setReFetch}
      />
    </AdminRoute>
  );
}
