import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import handcr from "../../images/afaaq bhai.jpg";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
  IconButton,
  Zoom,
  Hidden,
} from "@material-ui/core";
import {
  AssignmentLate,
  Dashboard,
  Person,
  FormatListBulleted,
  Comment,
  FindInPage,
  MoreVert,
  ExitToApp,
  PlaylistPlay,
} from "@material-ui/icons";
import { green, grey, pink, purple, yellow } from "@material-ui/core/colors";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  drawer: {
    marginTop: "61px",
    background: "white",
    padding: 10,
    paddingLeft: 0,
  },
  marginListItems: {
    marginBottom: "10px",
  },
  activeLink: {
    background: "rgb(233,30,99)",
    borderLeft: `3px solid rgb(0,143,229)`,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    color: "white",
  },
  ListItemText: {
    fontSize: 14,
  },
}));
const FixedDrawer = ({ open, setopen }) => {
  const classes = useStyles();
  const history = useHistory();
  const [checked, setChecked] = useState(true);
  const [refreshPage, setrefreshPage] = useState(null);
  useEffect(() => {
    if (!Cookies.get("admin")) {
      history.push("/admin");
    }
  }, [refreshPage]);
  const logout = () => {
    Cookies.remove("admin");
    setrefreshPage(!refreshPage);
  };

  return (
    <div>
      <Hidden only={["sm", "xs"]}>
        <Container>
          <Drawer
            variant="permanent"
            anchor="left"
            // overide the css of drawer
            classes={{ paper: classes.drawer }}
          >
            <Zoom in={checked}>
              <List style={{ width: 190 }}>
                {/* user image */}
                <Box display="flex" justifyContent="space-around">
                  <img
                    src={handcr}
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "100px", marginLeft: "5px" }}
                    variant="body1"
                    alt=""
                  />
                  <Typography variant="subtitle1" style={{ color: "white" }}>
                    John <br />
                    <Typography variant="caption" style={{ color: "white" }}>
                      Admin
                    </Typography>
                  </Typography>
                  <IconButton>
                    <MoreVert style={{ color: yellow[900] }} />
                  </IconButton>
                </Box>
                {/* some headings */}
                <Box textAlign="center" my={3}>
                  <Typography variant="h6" style={{ color: grey[900] }}>
                    Navigations
                  </Typography>
                </Box>
                {/* item 1 */}
                <Tooltip title="Dashboard" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    component={NavLink}
                    to="/admin"
                    exact
                    activeClassName={classes.activeLink}
                  >
                    <ListItemIcon>
                      <Dashboard
                        fontSize="small"
                        style={{ color: "#2196f3", fontSize: "15px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      primary="Dashboard"
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>

                {/* item 2 */}
                <Tooltip title="Users" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    component={NavLink}
                    to="/admin/users"
                    exact
                    activeClassName={classes.activeLink}
                  >
                    <ListItemIcon>
                      <Person
                        fontSize="small"
                        style={{ color: yellow[200], fontSize: 15 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Users"
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>
                {/* item 3 */}
                <Tooltip title="Courses" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    component={NavLink}
                    to="/admin/courses_handle"
                    exact
                    activeClassName={classes.activeLink}
                  >
                    <ListItemIcon>
                      <PlaylistPlay
                        fontSize="small"
                        style={{ color: green[800], fontSize: 15 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Courses"
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>
                {/* logout item 4 */}
                <Tooltip title="Logout" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    onClick={logout}
                  >
                    <ListItemIcon>
                      <ExitToApp
                        fontSize="small"
                        style={{ color: purple[400], fontSize: 15 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      primary="Logout"
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>
              </List>
            </Zoom>
          </Drawer>
        </Container>
      </Hidden>

      {/* This drawer will show only small screens */}
      <Hidden only={["xl", "lg", "md"]}>
        <Container>
          <Drawer
            anchor="top"
            // overide the css of drawer
            classes={{ paper: classes.drawer }}
            open={open}
            onClose={() => setopen(false)}
          >
            <Zoom in={checked}>
              <List>
                {/* user image */}
                <Box display="flex" justifyContent="space-around">
                  <img
                    src={handcr}
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "100px", marginLeft: "5px" }}
                    variant="body1"
                    alt=""
                  />
                  <Typography variant="subtitle1" style={{ color: "white" }}>
                    John
                  </Typography>
                  <IconButton>
                    <MoreVert style={{ color: yellow[900] }} />
                  </IconButton>
                </Box>
                {/* some headings */}
                <Box textAlign="center" my={3}>
                  <Typography variant="h6" style={{ color: grey[500] }}>
                    Navigations
                  </Typography>
                </Box>
                {/* item 1 */}
                <Tooltip title="Dashboard" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    component={NavLink}
                    to="/admin"
                    exact
                    activeClassName={classes.activeLink}
                  >
                    <ListItemIcon>
                      <Dashboard
                        fontSize="small"
                        style={{ color: "#2196f3", fontSize: "15px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      primary="Dashboard"
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>

                {/* item 2 */}
                <Tooltip title="Users" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    component={NavLink}
                    to="/admin/users"
                    exact
                    activeClassName={classes.activeLink}
                  >
                    <ListItemIcon>
                      <Person
                        fontSize="small"
                        style={{ color: yellow[200], fontSize: 15 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Users"
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>
                {/* courses */}
                <Tooltip title="Courses" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    component={NavLink}
                    to="/admin/courses_handle"
                    exact
                    activeClassName={classes.activeLink}
                  >
                    <ListItemIcon>
                      <PlaylistPlay
                        fontSize="small"
                        style={{ color: green[800], fontSize: 15 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Courses"
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>
                {/* logout */}
                <Tooltip title="Logout" arrow>
                  <ListItem
                    button
                    className={classes.marginListItems}
                    onClick={logout}
                  >
                    <ListItemIcon>
                      <ExitToApp
                        fontSize="small"
                        style={{ color: purple[400], fontSize: 15 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.ListItemText,
                      }}
                      primary="Logout"
                      style={{ color: grey[900] }}
                    />
                  </ListItem>
                </Tooltip>
              </List>
            </Zoom>
          </Drawer>
        </Container>
      </Hidden>
    </div>
  );
};

export default FixedDrawer;
