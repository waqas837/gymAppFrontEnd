import React, { useEffect, useState } from "react";
import axios from "axios";
import { userApi } from "../../../Api";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from "@material-ui/core";
const DialogForLoginAndSignup = ({ open, setopen, openas }) => {
  axios.defaults.withCredentials = true;
  const [state2, setstate2] = useState([]);
  const [pageRefresh, setpageRefresh] = useState(false);
  useEffect(() => {
    setstate2("");
  }, [pageRefresh]);
  // login
  const login = async () => {
    try {
      const { data } = await axios.post(`${userApi}/userLogin`, state2);
      console.log(data);
      if (data.success) {
        setopen(false);
        setpageRefresh(!pageRefresh);
        toast.success("Logged in successfully");
      } else if (data.invalidUser) {
        toast.error("Invalid information provided");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid information/server is down!");
    }
  };
  console.log(state2);
  // signup
  const addUpUser = async () => {
    if (state2.username === undefined) {
      toast.error(`Username is required`);
    } else if (state2.email === undefined) {
      toast.error(`Email is required`);
    } else if (state2.password === undefined) {
      toast.error(`Password is required`);
    }
    try {
      const { data } = await axios.post(`${userApi}/signupUser`, {
        username: state2.username,
        email: state2.email,
        password: state2.password,
      });
      if (data.userExists) {
        toast.error(`${data.userExists}`);
      }

      if (data.success) {
        setopen(false);
        setpageRefresh(!pageRefresh);
        toast.success("Account created successfully");
      }
    } catch (error) {
      toast.error("Invalid Email");
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <Dialog open={open} onClose={() => setopen(false)}>
        {openas === "signup" ? (
          <DialogTitle>Signup</DialogTitle>
        ) : openas === "login" ? (
          <DialogTitle>Login</DialogTitle>
        ) : null}

        <DialogContent>
          {openas === "login" ? null : (
            <Box my={1}>
              <Container>
                <OutlinedInput
                  onChange={(e) =>
                    setstate2({ ...state2, username: e.target.value })
                  }
                  placeholder="Username"
                  fullWidth
                />
              </Container>
            </Box>
          )}

          <Box my={1}>
            <Container>
              <OutlinedInput
                onChange={(e) =>
                  setstate2({ ...state2, email: e.target.value })
                }
                placeholder="Email address"
                fullWidth
              />
            </Container>
          </Box>
          <Box>
            <Container>
              <OutlinedInput
                type="password"
                onChange={(e) =>
                  setstate2({ ...state2, password: e.target.value })
                }
                placeholder="Password"
                fullWidth
              />
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          {openas === "signup" ? (
            <Button onClick={addUpUser} variant="outlined">
              Signup
            </Button>
          ) : openas === "login" ? (
            <Button onClick={login} variant="outlined">
              Login
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogForLoginAndSignup;
