import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { learnerOrTrainer } from "../../../Api";
import DateTimePicker from "react-datetime-picker";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Input,
  Paper,
  Typography,
} from "@material-ui/core";
const TrainerDashboard = () => {
  const token = Cookies.get("Trainer");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const currentLoggedIn = Cookies.get("user");
  const parseLoggedInUser = JSON.parse(currentLoggedIn);
  const userid = parseLoggedInUser._id;
  // get my location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((showPosition) =>
        setdata({
          ...data,
          location: {
            lng: showPosition.coords.longitude,
            lat: showPosition.coords.latitude,
          },
        })
      );
    }
    alert("location has been saved! Goto next step");
  };
  // send this data to backend
  const [data, setdata] = useState(undefined);
  // 1.this is for time and date picker
  const onChangeStartTime = (e) => {
    setdata({ ...data, starttime: e });
  };
  // 2.this is for time and date picker
  const onChangeEndTime = (e) => {
    setdata({ ...data, endtime: e });
  };
  // this is for state for checkbox
  const [state, setState] = useState({
    checkedB: false,
  });
  // onchange for checkbox
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //let add this course to database
  const addClass = async () => {
    try {
      const response = await axios.post(
        `${learnerOrTrainer}/saveClassOfInstructor/${userid}`,
        data,
        { headers }
      );
      // console.log(response.data);
      if (response.data.success) {
        alert("Course has been added succesfully");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };
  return (
    // linkage from admin dashboard remains
    <div>
      <Typography color="primary" variant="h4" style={{ textAlign: "center" }}>
        Trainer Dashboard
      </Typography>
      {/* main */}
      <Container>
        <Paper elevation={7} style={{ borderRadius: 0, padding: 4 }}>
          <Box my={2} textAlign="center">
            <Typography variant="h5" color="secondary">
              Welcome {parseLoggedInUser.username}
            </Typography>
            <Divider />
          </Box>
          <Container>
            <Grid container maxWidth="xs">
              <Grid item md={6}>
                <Typography variant="body2">
                  Note: Don't left any feild empty*
                </Typography>
                <Typography variant="h6">Make Your Introduction</Typography>
                <Input
                  onChange={(e) => setdata({ ...data, gyname: e.target.value })}
                  placeholder="Gym Name"
                />{" "}
                <br />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={getLocation}
                >
                  Get My location
                </Button>
                <br />
                <Input
                  onChange={(e) =>
                    setdata({ ...data, contact: e.target.value })
                  }
                  placeholder="Contact No"
                />{" "}
                <br />
                <Input
                  onChange={(e) =>
                    setdata({ ...data, address: e.target.value })
                  }
                  placeholder="FUll Address"
                />{" "}
                <br />
                {state.checkedB ? null : (
                  <div>
                    <Input
                      onChange={(e) =>
                        setdata({ ...data, charges: e.target.value })
                      }
                      placeholder="How much will You charge?"
                    />{" "}
                    <br />
                  </div>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="This is a free class and No charges?"
                />
              </Grid>

              <Grid item md={6}>
                <Typography variant="h6">Create Your Class(course)</Typography>
                <Input
                  onChange={(e) =>
                    setdata({ ...data, coursetitle: e.target.value })
                  }
                  placeholder="Course title"
                />{" "}
                <br />
                <Input
                  multiline
                  rows={4}
                  onChange={(e) =>
                    setdata({ ...data, description: e.target.value })
                  }
                  placeholder="Description"
                />{" "}
                <br />
                <Input
                  onChange={(e) =>
                    setdata({ ...data, lecturelink: e.target.value })
                  }
                  placeholder="Paste Class Lecture Link"
                />{" "}
                <br />
                <Typography variant="h6">Class starting data&time</Typography>
                <div>
                  <DateTimePicker onChange={onChangeStartTime} />
                </div>
                <br />
                <Typography variant="h6">Class ending data&time</Typography>
                <div>
                  <DateTimePicker onChange={onChangeEndTime} />
                </div>
                <br />
                <Input
                  placeholder="How many people can take class?"
                  type="number"
                  onChange={(e) =>
                    setdata({ ...data, maxstudents: e.target.value })
                  }
                />
                <br />
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  style={{ borderRadius: 0, marginTop: 4 }}
                  onClick={addClass}
                >
                  Add Your class
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default TrainerDashboard;
