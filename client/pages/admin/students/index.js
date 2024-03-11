import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import AdminRoute from "../../../components/routes/AdminRoute";
import StudentsTable from "./StudentsTable";

export default function AdminStudentsIndex() {
  const [students, setStudents] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    loadStudents();
  }, [reFetch]);

  const loadStudents = async () => {
    const { data } = await axios.get("/api/admin/all-students");
    // console.log(data);
    setStudents(data);
  };
  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <AdminRoute>
      <h1
        style={{
          backgroundImage: "linear-gradient(to right, #dae2f8 0%, #d6a4a4 100%)"
        }}
        className="jumbotron text-center square "
      >
        Admin Dashboard | Students Manager 🙎‍♂️
      </h1>

      <StudentsTable tableData={students} setReFetch={setReFetch} />
    </AdminRoute>
  );
}
