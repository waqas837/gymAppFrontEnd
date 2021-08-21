import React, { useState } from "react";
import { learnerOrTrainer } from "../../../Api";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  Grid,
  Paper,
  Container,
} from "@material-ui/core";
import axios from "axios";

const LeanerDashboard = () => {
  const [state, setstate] = useState(undefined);
  const [trainerDetails, settrainerDetails] = useState(undefined);
  const token = Cookies.get("Learner");
  const headers = {
    authorization: `Bearer ${token}`,
  };

  // getInstructorDetails
  const getInstructorDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `${learnerOrTrainer}/getInstructorDetails/${id}`,
        { headers }
      );
      console.log(data.details);
      settrainerDetails(data.details);
    } catch (error) {
      console.log(error);
    }
  };
  // get all instructors
  const getAllInstructors = async () => {
    try {
      const { data } = await axios.get(`${learnerOrTrainer}/getInstructors`, {
        headers,
      });
      // console.log(data.instructors);
      setstate(data.instructors);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Box>
        <Typography variant="h5">Learner dashboard</Typography>
      </Box>
      <Button onClick={getAllInstructors} variant="outlined" color="secondary">
        Check availalbe trainers
      </Button>
      {/* showing here only availble trainers */}
      {state
        ? state.map((val, index) => (
            <Grid container>
              <Grid item md={4}>
                <List key={index}>
                  <ListItem
                    button
                    onClick={() => getInstructorDetails(val._id)}
                  >
                    {val.username}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          ))
        : null}
      {/* while learner click on a specific learner then here showing details of 
        the all avalible trainers */}
      {trainerDetails ? (
        <Container maxWidth="sm">
          <Box p={4} style={{ border: "1px solid green" }}>
            <Typography variant="h5">Trainer Details</Typography>
            Course Title : {trainerDetails.coursetitle} <br />
            Price of Course : {trainerDetails.charges} <br />
            Gym Name : {trainerDetails.gyname} <br />
            Location of gym:LAT : {trainerDetails.location.lng} <br />
            Location of gym:LNG : {trainerDetails.location.lat} <br />
            Start time: {trainerDetails.starttime} <br />
            End time : {trainerDetails.endtime} <br />
            Lecture link : {trainerDetails.lecturelink} <br />
            Description : {trainerDetails.description} <br />
            Contact Number : {trainerDetails.contact} <br />
            Students Can join : {trainerDetails.maxstudents} <br />
            Trainer Address : {trainerDetails.address} <br />
          </Box>
        </Container>
      ) : null}
    </div>
  );
};

export default LeanerDashboard;
