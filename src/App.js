import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "js-cookie";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserList from "./components/AdminDashboard/UserList";
import CoursesHandle from "./components/AdminDashboard/CourseHandle";
import LoginAdmin from "./components/AdminDashboard/LoginAdmin";
import Navbar from "./components/Home/LoginAndSignup/Navbar";
import Qr from "./Qr";
import TrainerDashboard from "./components/Home/TrainerDashboard/TrainerDashboard";
import LeanerDashboard from "./components/Home/LearnerDashboard/LeanerDashboard";
const font = "Open Sans";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
  button: {
    textTransform: "capitalize",
  },
});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path="/">
            <Navbar />
            {Cookies.get("Trainer") ? (
              <TrainerDashboard />
            ) : Cookies.get("Learner") ? (
              <LeanerDashboard />
            ) : null}
          </Route>
          <Route exact path="/qr">
            <Qr />
          </Route>
          {/* admin login */}
          <Route exact path="/admin">
            <LoginAdmin />
          </Route>

          {Cookies.get("admin") && (
            <React.Fragment>
              <Route exact path="/admin/dashboard">
                <AdminDashboard />
              </Route>
              <Route exact path="/admin/users">
                <UserList />
              </Route>
              <Route exact path="/admin/courses_handle">
                <CoursesHandle />
              </Route>
            </React.Fragment>
          )}
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
