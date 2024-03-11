import { useState, useEffect } from "react";
import Link from "next/link";

const AdminNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/admin">
        <a className={`nav-link ${current === "/admin" && "active"}`}>
          Courses Manager
        </a>
      </Link>
      <Link href="/admin/students">
        <a className={`nav-link ${current === "/admin/students" && "active"}`}>
          Students Manager
        </a>
      </Link>

      <Link href="/admin/instructors">
        <a
          className={`nav-link ${current === "/admin/instructors" && "active"}`}
        >
          Instructors Manager
        </a>
      </Link>
    </div>
  );
};

export default AdminNav;
