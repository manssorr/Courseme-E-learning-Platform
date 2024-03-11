import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import {
  PasswordInput,
  TextInput,
  Button,
  Box,
  Group,
  Title,
  Input
} from "@mantine/core";

import {  GoogleOutlined,} from "@ant-design/icons";





const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // context
  const {
    state: { user },
  } = useContext(Context);
  // router
  const router = useRouter();

  // redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code, newPassword);
    // return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast("Great! Now you can login with your new password");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <div className="container-md">
      <div className="row">
        <div
          className="col-6 postion-absolute top-50 start-50 translate-middle align-items-center "
          style={{ hight: "100px", margin: "auto" ,width:"100px"}} >
          <Box>
            <form onSubmit={success ? handleResetPassword : handleSubmit}>
              <Title
                className="text-left  justify-content-center "
                style={{
                  fontSize: "1.5rem",
                  color: "#2d5ebe",
                  marginBottom: "20px",
                  marginTop: "50px",
                }}
              >
                Forgot passsword
              </Title>

              <TextInput
                mb="20px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" email"
                required
              />

              {success && (
                <div>
                  <input
                    type="text"
                    className="form-control mb-4 "
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter secret code"
                    required
                  />

                  <PasswordInput
                  
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                  />
                  <a href="https://mail.google.com/"  target="_blank">
                  <Button  
                  style={{ width: "100%", backgroundColor: "#d9d9d9",margin: "10px 0px"}}>
                  
                  <GoogleOutlined
                  style={{
                    width: "100%",
                    color: "#f5222d",
                    fontSize: "25px",
                    margin:"auto"
                  }}
                />
                    O to gmail
                </Button>
                </a>
                </div>
              )}
              <Button
                type="primary"
                block
                style={{ width: "100%", backgroundColor: "#2d5ebe", marginBottom: "50px",}}
                disabled={loading || !email}
              >
                {loading ? <SyncOutlined spin /> : "Submit"}
              </Button>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
