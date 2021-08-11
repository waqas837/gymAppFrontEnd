import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Box,
  Grid,
  Container,
  Typography,
  Divider,
  Button,
  TextField,
  LinearProgress,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { userApi } from "../../Api";
import axios from "axios";
const LoginAdmin = () => {
  axios.defaults.withCredentials = true;
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (Cookies.get("admin")) {
      history.push("/admin/dashboard");
    }
  }, []);
  //admin login
  const adminLogin = async () => {
    try {
      setloading(true);
      const { data } = await axios.post(`${userApi}/adminLogin`, state);
      setloading(false);
      if (data.message) {
        if (Cookies.get("admin")) {
          history.push("/admin/dashboard");
        } else {
          toast.error("Invalid Information provided!");
        }
      } else if (data.invalidUser) {
        toast.error("Invalid Information provided!");
      }
    } catch (error) {
      setloading(false);
      toast.error("Invalid Information provided!");
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      <Box textAlign="center" my={8}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            style={{ marginLeft: "auto", marginRight: "auto", padding: 10 }}
          >
            {loading ? <LinearProgress color="secondary" /> : null}
            <Paper
              elevation={4}
              style={{ borderRadius: 0, paddingTop: 10, paddingBottom: 5 }}
            >
              <Container>
                <Typography
                  style={{
                    textAlign: "left",
                    fontWeight: "lighter",
                  }}
                  variant="h6"
                >
                  Sign In
                </Typography>
                <Divider />
                {/* email heading */}
                <Box textAlign="left" mt={2}>
                  <Typography
                    style={{
                      textAlign: "left",
                      fontWeight: "lighter",
                    }}
                    variant="caption"
                  >
                    Email
                  </Typography>
                </Box>
                {/* password input */}
                <Box>
                  <TextField
                    onChange={(e) =>
                      setstate({ ...state, email: e.target.value })
                    }
                    type="email"
                    placeholder="Email"
                    fullWidth
                  />
                </Box>
                <Box textAlign="left" mt={2}>
                  <Typography
                    style={{
                      textAlign: "left",
                      fontWeight: "lighter",
                    }}
                    variant="caption"
                  >
                    Password
                  </Typography>
                </Box>
                {/* passowrd */}
                <Box>
                  <TextField
                    onChange={(e) =>
                      setstate({ ...state, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                    fullWidth
                  />
                </Box>
                {/* submit button */}
                <Box my={4}>
                  {loading ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ borderRadius: 0, opacity: 1 }}
                      endIcon={<ArrowRight fontSize="small" />}
                      fullWidth
                      disabled
                    >
                      Login
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ borderRadius: 0 }}
                      endIcon={<ArrowRight fontSize="small" />}
                      fullWidth
                      onClick={adminLogin}
                    >
                      Login
                    </Button>
                  )}
                </Box>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoginAdmin;
