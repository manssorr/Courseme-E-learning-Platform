import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SyncOutlined,
  GoogleOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { Form, Input, Checkbox } from "antd";
import {
  PasswordInput,
  TextInput,
  Button,
  Box,
  Group,
  Divider,
  Title,
  Text,
  createStyles,
  Image,
} from "@mantine/core";

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
      fontFamily: `Greycliff CF, ${theme.other.fontFamilySecondary}`,
      fontSize: "50px",
      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
        fontSize: "25px",
      },
    },
  };
});

const Login = () => {
  const { classes } = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;
  // router
  const router = useRouter();
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const onSubmitHanddler = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.push("/user");
      // setLoading(false);
    } catch (err) {
      
      toast.error(err.response.data);
        setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row" >
        <div className="col  align-items-center " style={{hight:"100px" , margin:"auto"}}>
        
        <Box>
          <form onSubmit={onSubmitHanddler}>
            <Title className="text-left  justify-content-center " style={{ fontSize: "30px", color: "#2d5ebe" ,padding: "20px",}}>Login
            </Title>
            
            <input
              type="email"
              className="form-control mb-4 p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" email"
              required
            />

            <input
              type="password"
              className="form-control mb-2 p-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" password"
              required
            />

            <p className="text-left ">
              <Link href="/forgot-password">
                <a style={{color:"#096dd9"}}>Forgot password ?</a>
              </Link>
            </p>

            <Button
              type="primary"
              block
              
              style={{width:"100%" , backgroundColor:"#2d5ebe"}}
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Login"}
            </Button>
          </form>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <div className=" row space-evenlly "
          >
            
              <div class="col">
                <a href="https://accounts.google.com/ServiceLogin/signinchooser?elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                target="_blank">
                  <GoogleOutlined
                    style={{ width: "100%", color: "#f5222d",fontSize: "25px" }}
                  />
                </a>
              </div>
              <div class="col">
                <a href="https://www.linkedin.com/login" target="_blank">
                  <LinkedinOutlined
                    style={{ width: "100%", color: "#08c",fontSize: "25px" }}
                  />
                </a>
              </div>

              <div class="col">
                <a href="https://github.com/login" target="_blank">
                  
                  <GithubOutlined style={{ width: "100%" ,fontSize: "25px", color: "#000" }} />
                </a>
              </div>
          </div>
        </Box>

        </div>
        <div className="col">
        
        
        <Group className={classes.contacts}>
        <Text
          size="lg"
          weight={700}
          className={classes.title}
          sx={{ color: "#fff" }}
        >
          Don't have an account?
        </Text>
        <Image src="../EducationLogin.png" />
        <Link
        style={{
          textDecoration: "none",
        }}
        href="/register"
      >
        <Button variant="white" size="lg" fullWidth radius={5}>
          Join Now
        </Button>
      </Link>
      </Group>
    
    
        
        
        
        </div>
      </div>
    </div>
  );
};

export default Login;
