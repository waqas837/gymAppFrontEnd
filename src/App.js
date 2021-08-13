import React from "react";
import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "js-cookie";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserList from "./components/AdminDashboard/UserList";
import CoursesHandle from "./components/AdminDashboard/CourseHandle";
import LoginAdmin from "./components/AdminDashboard/LoginAdmin";
import Navbar from "./components/Home/LoginAndSignup/Navbar";
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
           <Navbar/>
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
