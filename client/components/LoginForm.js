import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  PasswordInput,
  TextInput,
  Button,
  Box,
  Group,
  Divider,
  Title,
} from "@mantine/core";
import isEmail from "validator/es/lib/isEmail";
import { Redirect } from "react-router-dom";
import axios, { authHeader } from "../apis/axios";

// Icons
import { At, Lock } from "tabler-icons-react";
// Buttons
import { useNotifications } from "@mantine/notifications";
import {
  GoogleButton,
  FacebookButton,
  GithubButton,
  LinkedInButton,
} from "./SocialButtons/SocialButtons";
import { CheckIcon } from "@primer/octicons-react";


function Demo() {
  const [redirect, setRedirect] = useState(false);
  const notifications = useNotifications();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        return isEmail(value) ? null : "Enter a valid email";
      },
    },
  });

  const onSubmitHanddler = async (values) => {
    const id = notifications.showNotification({
      loading: true,
      title: "Search for you in the database 🔍",
      message: "It usualy takes 2 seconds! do some thing useful 🙂",
      autoClose: false,
      disallowClose: true,
    });

    try {
      const response = await axios.post("/users/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("luserMe", JSON.stringify(response.data.data));

      setTimeout(() => {
        notifications.updateNotification(id, {
          id,
          color: "teal",
          title: "We found you ! ✅",
          message: "Welcome, this will leave after saying AlHamdullah! 🙂",
          icon: <CheckIcon />,
          autoClose: 2000,
        });
        setRedirect(true);
      }, 3000);
    } catch (error) {
      console.log(error.message);
      setTimeout(() => {
        notifications.updateNotification(id, {
          id,
          color: "red",
          title: "Can't add user 😣 ",
          message: "This email is already in out databases! 🤥",
          icon: <CheckIcon />,
          autoClose: 2000,
        });
      }, 3000);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Box sx={{ maxWidth: 660 }}>
      <form onSubmit={form.onSubmit(onSubmitHanddler)}>
        <Title
          order={1}
          sx={(theme) => ({
            color: theme.colors.mainBlue[6],
          })}
        >
          Login
        </Title>

        <TextInput
          icon={<At />}
          // required
          placeholder="mansour@mail.com"
          radius="xs"
          mt="sm"
          size="lg"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          // required
          placeholder="Your password"
          icon={<Lock size={16} />}
          radius="xs"
          mt="sm"
          size="lg"
          {...form.getInputProps("password")}
        />

        <Group position="center" mt="xl">
          <Button type="submit" size="lg" fullWidth radius={5}>
            Login
          </Button>
        </Group>
      </form>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <GithubButton radius="xl">Github</GithubButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
        <LinkedInButton radius="xl">LinkedIn</LinkedInButton>
      </Group>
    </Box>
  );
}

export default Demo;





<div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="text-center">
          <Link href="/forgot-password">
            <a className="text-danger">Forgot password</a>
          </Link>
        </p>
      </div>