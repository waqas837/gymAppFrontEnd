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
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import Cookies from "js-cookie";
const DialogForLoginAndSignup = ({ open, setopen, openas }) => {
  axios.defaults.withCredentials = true;
  const [state3, setstate3] = useState("Trainer");
  const [value, setvalue] = React.useState("Trainer"); 
  // so first we make its value to learner
  useEffect(() => {
    setstate3({ role: "Trainer" });
  }, []);
  // handle radio
  const handleRadio = (e) => {
    setvalue(e.target.value);
    setstate3({ ...state3, role: e.target.value });
  };
  // console.log(state3);
  // Signup maybe a learner/trainer
  const SignupLearnerOrTrainer = async () => {
    try {
      const { data } = await axios.post(`${userApi}/signupUser`, {
        username: state3.username,
        email: state3.email,
        password: state3.password,
        role: state3.role,
      });
      // console.log(data)
      if (data.userExists) {
        toast.error(`${data.userExists}`);
      }

      if (data.success) {
        setopen(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Invalid Email");
      console.log(error);
    }
  };
  // login
  const login = async () => {
    try {
      const { data } = await axios.post(`${userApi}/userLogin`, state3);
      // console.log(data.userDetails);
      Cookies.set("user",JSON.stringify(data.userDetails))
      if (data.success) {
        setopen(false);
        window.location.reload();
        toast.success("Logged in successfully");
      } else if (data.invalidUser) {
        toast.error("Invalid information provided");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid information/server is down!");
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
                    setstate3({ ...state3, username: e.target.value })
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
                  setstate3({ ...state3, email: e.target.value })
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
                  setstate3({ ...state3, password: e.target.value })
                }
                placeholder="Password"
                fullWidth
              />
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          {openas === "signup" ? (
            <div>
              <Box my={1}>
                <FormControl>
                  <FormLabel>Select Role</FormLabel>
                  <RadioGroup row value={value} onChange={handleRadio}>
                    <FormControlLabel
                      label={<span style={{ fontSize: 14 }}>Trainer</span>}
                      value="Trainer"
                      control={<Radio size="small" />}
                    />
                    <FormControlLabel
                      label={<span style={{ fontSize: 14 }}>Learner</span>}
                      value="Learner"
                      control={<Radio size="small" />}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Button onClick={SignupLearnerOrTrainer} variant="outlined">
                Signup
              </Button>
            </div>
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
