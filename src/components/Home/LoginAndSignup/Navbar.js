import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { userApi } from "../../../Api";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Button,
  makeStyles,
} from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";
import DialogForLoginAndSignup from "./DialogForLoginAndSignup";
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Navbar = () => {
  const classes = useStyles();
  const [open, setopen] = useState(null);
  const [openas, setopenas] = useState("NoSelection");

  //logout
  const logout = () => {
    if (Cookies.get("Learner")) {
      Cookies.remove("Learner");
    } else if (Cookies.get("Trainer")) {
      Cookies.remove("Trainer");
    }
    window.location.reload();
  };
  // login
  const login = () => {
    setopen(true);
    setopenas("login");
  };
  // signup
  const signup = () => {
    setopen(true);
    setopenas("signup");
  };
  return (
    <div>
      <Toaster />
      {/* Challenge: Every component's code should not be exceed upto 100 lines */}
      <AppBar position="static" style={{ background: green[500] }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GYMapp
          </Typography>
          {Cookies.get("Learner") || Cookies.get("Trainer") ? (
            <Button variant="outlined" color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <React.Fragment>
              <Button color="inherit" variant="outlined" onClick={signup}>
                Signup
              </Button>
              &nbsp;
              <Button color="inherit" variant="outlined" onClick={login}>
                Login
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <DialogForLoginAndSignup open={open} setopen={setopen} openas={openas} />
    </div>
  );
};

export default Navbar;
