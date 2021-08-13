import React, { useState } from "react";
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
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setopen(true)}
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>
      <DialogForLoginAndSignup open={open} setopen={setopen} />
    </div>
  );
};

export default Navbar;
