import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import AdminRoute from "../../../components/routes/AdminRoute";
import InstructorsTable from "./InstructorsTable";

export default function AdminInstructorsIndex() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    loadCourses();
  }, [reFetch]);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/admin/all-instructors");
    await setInstructors(data?.users);
    await setCourses(data?.courses);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <AdminRoute>
      <h1
        style={{
          backgroundImage: "linear-gradient(to right, #70e1f5 0%, #ffd194 100%)"
        }}
        className="jumbotron text-center square"
      >
        Admin Dashboard | Instructors Manager 🧑‍🏫
      </h1>

      <InstructorsTable
        tableData={instructors}
        courses={courses}
        setReFetch={setReFetch}
      />
    </AdminRoute>
  );
}
