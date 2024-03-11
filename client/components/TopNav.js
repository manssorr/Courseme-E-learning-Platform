import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu
      theme="white"
      mode="horizontal"
      selectedKeys={[current]}
      className="sticky-top mb-2"
      style={{ boxShadow: "0px 2px 20px rgb(0,0,0,0.1)" }}
    >
      {/* <Item
        style={{
          color: "#2d5ebe",
        }}
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      > */}
      <Link href="/">
        <a
          style={{
            color: "#2d5ebe",
            fontSize: "25px",
            margin: "0px 30px ",
            fontWeight: "bold",
          }}
        >
          Courseme
        </a>
      </Link>
      {/* </Item> */}
      <Item key="/courses" onClick={(e) => setCurrent(e.key)}>
        <Link href="/courses">
          <a
            style={{
              color: "#2d5ebe",
            }}
          >
            {" "}
            Courses{" "}
          </a>
        </Link>
      </Item>
      <Item key="/about" onClick={(e) => setCurrent(e.key)}>
        <Link href="/about">
          <a
            style={{
              color: "#2d5ebe",
            }}
          >
            {" "}
            About{" "}
          </a>
        </Link>
      </Item>

      {!user?.role.includes("Admin") &&
        (user && user.role && user.role.includes("Instructor") ? (
          <Item
            style={{
              color: "#2d5ebe",
            }}
            key="/instructor/course/create"
            onClick={(e) => setCurrent(e.key)}
            icon={<CarryOutOutlined />}
          >
            <Link href="/instructor/course/create">
              <a
                style={{
                  color: "#2d5ebe",
                }}
              >
                Create Course
              </a>
            </Link>
          </Item>
        ) : (
          <Item
            key="/user/become-instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
            <Link href="/user/become-instructor">
              <a
                style={{
                  color: "#2d5ebe",
                }}
              >
                Become Instructor
              </a>
            </Link>
          </Item>
        ))}

      {}

      {user === null && (
        <>
          <Item
            className="float-right"
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
            style={{
              color: "#2d5ebe",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/register">
              <a
                style={{
                  color: "#2d5ebe",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Register
              </a>
            </Link>
          </Item>

          <Item
            className="float-right"
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a
                style={{
                  color: "#2d5ebe",
                }}
              >
                Login
              </a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          style={{
            color: "#2d5ebe",
            display: "flex",
            alignItems: "center",
          }}
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <ItemGroup
            style={{
              color: "#2d5ebe",
            }}
          >
            <Item
              style={{
                color: "#2d5ebe",
              }}
              key="/user"
            >
              <Link href="/user">
                <a
                  style={{
                    color: "#2d5ebe",
                  }}
                >
                  Dashboard
                </a>
              </Link>
            </Item>
            <Item
              style={{
                color: "red",
              }}
              onClick={logout}
            >
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
          style={{
            color: "#2d5ebe",
            display: "flex",
            alignItems: "center",
          }}
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          <Link href="/instructor">
            <a
              style={{
                color: "#2d5ebe",
              }}
            >
              Instructor
            </a>
          </Link>
        </Item>
      )}

      {user && user.role && user.role.includes("Admin") && (
        <Item
          style={{
            color: "#2d5ebe",
            display: "flex",
            alignItems: "center",
          }}
          key="/admin"
          onClick={(e) => setCurrent(e.key)}
          icon={<CrownOutlined />}
          className="float-right"
        >
          <Link href="/admin">
            <a
              style={{
                color: "#2d5ebe",
              }}
            >
              Admin
            </a>
          </Link>
        </Item>
      )}
    </Menu>
  );
};

export default TopNav;
