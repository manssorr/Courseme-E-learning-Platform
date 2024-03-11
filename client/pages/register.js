import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

import {
  PasswordInput,
  TextInput,
  Button,
  Box,
  Group,
  Divider,
  RadioGroup,
  Radio,
  Title,
  Text,
  Image,
  createStyles,
} from "@mantine/core";
import { At, Lock, Router } from "tabler-icons-react";
import {
  SyncOutlined,
  GoogleOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");
  const HIDEBLOCK = theme.fn.smallerThan("md");
  return {
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: theme.radius.lg,
      padding: "50px",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "70vw",
      columnGap: "100px",
      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      display: "flex",
      borderRadius: theme.radius.md,
      backgroundColor: "#2D5EBE",
      border: "1px solid transparent",
      padding: theme.spacing.xl,
      justifyContent: "space-between",
      flex: "1 0.25 200px",
      maxWidth: "650px",
      [HIDEBLOCK]: {
        display: "none",
      },
      [BREAKPOINT]: {
        display: "flex",
        flex: "1 0.25 200px",
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginTop: theme.spacing.xl * 1.5,
      fontSize: "30px",
      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
        fontSize: "25px",
      },
    },
  };
});



const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { classes } = useStyles();
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      // console.log("REGISTER RESPONSE", data);
      toast("Registration successful. Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      router.push("/login")
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="container"
    style={{ marginBottom: "50px", marginTop: "50px" }}
    >
      <div className="row">
      <div className="col  align-items-center "
      style={{ hight: "100px", margin: "auto" }}
    >
    <Group className={classes.contacts}>
        <Text
          size="lg"
          weight={300}
          className={classes.title}
          sx={{ color: "#fff" }}
        >
          Are you on Courseme?
        </Text>
        <Image src="../EducationSignup.png" />
        <Link
          style={{
            textDecoration: "none",
          }}
          href="/login"
        >
          <Button
            variant="white"
            size="lg"
            fullWidth
            radius={5}
            style={{color:"#2d5ebe"}}
          >
            Login now!
          </Button>
        </Link>

      
      </Group>

        
        </div>
        <div
        className="col  align-items-center "
        style={{ hight: "100px", margin: "auto" }}
      >
        <Box>
          <form onSubmit={handleSubmit}>
            <Title
              className="text-left  justify-content-center "
              style={{
                fontSize: "30px",
                color: "#2d5ebe",
                marginBottom: "20px",
              }}
            >
              Register
            </Title>

            <TextInput
              mb="20px"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" Username"
              required
            />
            <TextInput
              type="email"
              mb="20px"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" email"
              required
            />

            <PasswordInput
              mb="20px"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" password"
              required
            />
            <Button
              type="primary"
              block
              style={{ width: "100%", backgroundColor: "#2d5ebe" }}
              disabled={!name || !email || !password || loading}
            >
            {loading ? <SyncOutlined spin /> : "Register"}
            </Button>
          </form>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <div className=" row align-items-center"
          style={{margin: "auto"}}>
            <div class="col">
              <a href="https://accounts.google.com/ServiceLogin/signinchooser?elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
              target="_blank">
                <GoogleOutlined
                  style={{
                    width: "100%",
                    color: "#f5222d",
                    fontSize: "25px",
                  }}
                />
              </a>
            </div>
            <div class="col">
              <a href="https://www.linkedin.com/login" target="_blank">
                <LinkedinOutlined
                  style={{ width: "100%", color: "#08c", fontSize: "25px" }}
                />
              </a>
            </div>

            <div class="col">
              <a href="https://github.com/login" target="_blank">
                <GithubOutlined
                  style={{ width: "100%", fontSize: "25px", color: "#000" }}
                />
              </a>
            </div>
          </div>
        </Box>
      </div>
      
      
      </div>
    </div>
  );
};

export default Register;
