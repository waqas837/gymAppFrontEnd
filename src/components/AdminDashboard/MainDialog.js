import React, { useEffect, useRef } from "react";
import mapimg from "../../images/locationimage.png";
import dummyimg from "../../images/download.jpg";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  OutlinedInput,
  Typography,
  Input,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
} from "@material-ui/core";
import {
  AddCircleOutline,
  EmailOutlined,
  HighlightOff,
} from "@material-ui/icons";
import { MainSecondary, useStyles } from "./Main.Styles";
import axios from "axios";
import { userApi, coursesApi } from "../../Api";
import CustomizationDialog from "./CustomizationDialog";
// just remember that: if postCheck is true it will add a post ,else edit a post
const AddAndEditMemberDialog = ({
  open,
  setopen,
  user,
  post,
  comment,
  member,
  userData,
}) => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [CourseUploadDialog, setCourseUploadDialog] = React.useState(null);
  const [insImage, setinsImage] = React.useState(null);
  const [customizeValue, setcustomizeValue] = React.useState("NoSelection");
  const [state, setstate] = React.useState([]);
  const [openCustomize, setopenCustomize] = React.useState(false);
  const [showCourses, setshowCourses] = React.useState([]);
  const [showLanguages, setshowLanguages] = React.useState([]);
  
  // var userCheck = "AddCourse";
  // // always call an api in useEffect
  // useEffect(() => {
  //   fetchCourseAndLanguagesDB();
  // }, [userCheck]);
  axios.defaults.withCredentials = true;
  const courseCustomization = () => {
    setopenCustomize(true);
    setcustomizeValue("courseCustomize");
  };
  // //Fetch fetchCourseDB
  // const fetchCourseAndLanguagesDB = async () => {
  //   try {
  //     const { data } = await axios.get(`${coursesApi}/defaultCourses`);
  //     // console.log(data)
  //     setshowCourses(data.newData[0].courselevel.map((val) => val));
  //     setshowLanguages(data.newData[0].language.map((val) => val));
  //     // console.log(data.data.language);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // // update user
  // const udpateUser = async (userId) => {
  //   try {
  //     const { data } = await axios.patch(
  //       `${userApi}/updateUser/${userId}`,
  //       state
  //     );
  //     if (data) {
  //       setopen(false);
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  ;
  //language customization
  const languageCustomization = () => {
    setopenCustomize(true);
    setcustomizeValue("languageCustomize");
  };
  return (
    <div>
      {/* main dialog box */}
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>
          {(() => {
            if (user === "EditUser") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Edit User
                </Typography>
              );
            }
            if (post === "EditPost") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Edit Post
                </Typography>
              );
            }
            if (post === "AddPost") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Add Post
                </Typography>
              );
            }
            if (user === "AddUser") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Add User
                </Typography>
              );
            }
            if (user === "AddCourse") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Add Course
                </Typography>
              );
            }
            if (comment === "EditComment") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Edit Comment
                </Typography>
              );
            }
            if (member === "AddMember") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Add Member
                </Typography>
              );
            }
            if (member === "EditMember") {
              return (
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Edit Member
                </Typography>
              );
            }
          })()}

          {/* close icon button common in all*/}
          <Box textAlign="right" style={{ marginTop: "-40px" }}>
            <IconButton onClick={() => setopen(false)}>
              <HighlightOff style={{ color: MainSecondary }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* iife for the edit user */}
          {(() => {
            if (user === "EditUser") {
              return (
                <div>
                  {/* <Box my={1}>
                    <Container>
                      <OutlinedInput
                        onChange={(e) =>
                          setstate({ ...state, username: e.target.value })
                        }
                        defaultValue={userData.username}
                        placeholder="Username"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        onChange={(e) =>
                          setstate({ ...state, email: e.target.value })
                        }
                        defaultValue={userData.email}
                        placeholder="Email address"
                        fullWidth
                        endAdornment={
                          <EmailOutlined
                            fontSize="small"
                            style={{ color: "grey" }}
                          />
                        }
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        onChange={(e) =>
                          setstate({ ...state, password: e.target.value })
                        }
                        placeholder="Password"
                        fullWidth
                        className={classes.input}
                        defaultValue={userData.password}
                      />
                    </Container>
                  </Box> */}

                  {/* <Box>
                    <Container>
                      <Button
                        variant="contained"
                        fullWidth
                        className={classes.buttonStyle}
                        style={{ marginBottom: "16px" }}
                        onClick={() => udpateUser(userData._id)}
                      >
                        Update
                      </Button>
                    </Container>
                  </Box> */}
                </div>
              );
            }
          })()}
          {/* iife for the add a new user */}
          {(() => {
            if (user === "AddUser") {
              return (
                {/* <div>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Username"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Email address"
                        fullWidth
                        endAdornment={
                          <EmailOutlined
                            fontSize="small"
                            style={{ color: "grey" }}
                          />
                        }
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Password"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Confirm Passowrd"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box>
                    <Container>
                      <Button
                        variant="contained"
                        fullWidth
                        className={classes.buttonStyle}
                        style={{ marginBottom: "16px" }}
                      >
                        Add User
                      </Button>
                    </Container>
                  </Box>
                </div> */}
              );
            }
          })()}
          {/* iife for the add a course */}
          {(() => {
            if (user === "AddCourse") {
              return (
                <div>
                 
                  {/* instructor profile */}
                  <Box my={1}>
                    <Container>
                      <Typography variant="caption">
                        Instructor Profile
                      </Typography>
                      <br />
                      <Input type="file" />
                    </Container>
                  </Box>

                  COURSES Level
                  <Box my={2}>
                    <Container>
                      <FormControl className={classes.formControl2}>
                        <InputLabel style={{ marginTop: "4px" }}>
                          Select Course Level
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          onChange={handleChange}
                        >
                          {showCourses.map((val, index) => (
                            <MenuItem value={index}>{val.title}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* add a new level course ICON */}
                      <Tooltip title="Customize Course Levels">
                        <IconButton onClick={courseCustomization}>
                          <AddCircleOutline
                            color="secondary"
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </Container>
                  </Box>
                  {/* SELECT LANGUAGE */}

                  <Box my={2}>
                    <Container>
                      <FormControl className={classes.formControl2}>
                        <InputLabel style={{ marginTop: "4px" }}>
                          Select Language
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          onChange={handleChange}
                        >
                          {showLanguages.map((val, index) => (
                            <MenuItem value={index}>{val.title}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* add a new level course ICON */}
                      <Tooltip title="Customize Languages" arrow>
                        <IconButton onClick={languageCustomization}>
                          <AddCircleOutline
                            color="secondary"
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </Container>
                  </Box>
                  {/* END LANGUAEGE SELECT */}

                  {/* <Box>
                    <Container>
                      <Button
                        variant="contained"
                        fullWidth
                        className={classes.buttonStyle}
                        style={{ marginBottom: "16px" }}
                        onClick={createNewCourse}
                      >
                        Add Course
                      </Button>
                    </Container>
                  </Box> */}
                </div>
              );
            }
          })()}
          {/* iife for add a post */}
          {(() => {
            if (post === "AddPost") {
              return (
                <div>
                  <Container maxWidth="xs">
                    <Grid container>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <img
                          style={{ borderRadius: "10px" }}
                          src={dummyimg}
                          alt=""
                          width="70%"
                          height="70px"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <img
                          style={{ borderRadius: "10px" }}
                          src={dummyimg}
                          alt=""
                          width="70%"
                          height="70px"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <img
                          style={{ borderRadius: "10px" }}
                          src={dummyimg}
                          alt=""
                          width="70%"
                          height="70px"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <img
                          style={{ borderRadius: "10px" }}
                          src={dummyimg}
                          alt=""
                          width="70%"
                          height="70px"
                        />
                      </Grid>
                    </Grid>
                  </Container>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Add title"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Description"
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Container>
                  </Box>
                </div>
              );
            }
          })()}
          {/* iife for edit member */}
          {(() => {
            if (member === "EditMember") {
              return (
                <div>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Username"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Fullname"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Email address"
                        fullWidth
                        endAdornment={
                          <EmailOutlined
                            fontSize="small"
                            style={{ color: "grey" }}
                          />
                        }
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Phone No"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="About Me"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Role Type"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Password"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>
                  <Box>
                    <Container>
                      <Button
                        variant="contained"
                        fullWidth
                        className={classes.buttonStyle}
                        style={{ marginBottom: "16px" }}
                      >
                        Update Member
                      </Button>
                    </Container>
                  </Box>
                </div>
              );
            }
          })()}
          {/* iife for edit member */}
          {(() => {
            if (member === "AddMember") {
              return (
                <div>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Username"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Fullname"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Email address"
                        fullWidth
                        endAdornment={
                          <EmailOutlined
                            fontSize="small"
                            style={{ color: "grey" }}
                          />
                        }
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Phone No"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>

                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="About Me"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Role Type"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Password"
                        fullWidth
                        className={classes.input}
                      />
                    </Container>
                  </Box>
                  <Box>
                    <Container>
                      <Button
                        variant="contained"
                        fullWidth
                        className={classes.buttonStyle}
                        style={{ marginBottom: "16px" }}
                      >
                        Add Member
                      </Button>
                    </Container>
                  </Box>
                </div>
              );
            }
          })()}
          
          {/* iffie for edit the comments */}
          {(() => {
            if (comment === "EditComment") {
              return (
                <div>
                  <Box my={1}>
                    <Container>
                      <OutlinedInput
                        placeholder="Update comment"
                        fullWidth
                        multiline
                        rows={3}
                      />
                    </Container>
                  </Box>
                  <Box>
                    <Container>
                      <Button
                        variant="contained"
                        fullWidth
                        className={classes.buttonStyle}
                        style={{ marginBottom: "16px" }}
                      >
                        Update comment
                      </Button>
                    </Container>
                  </Box>
                </div>
              );
            }
          })()}
        </DialogContent>
      </Dialog>
      {/* cusomization dialog */}
      <CustomizationDialog
        openCustomize={openCustomize}
        setopenCustomize={setopenCustomize}
        customizeValue={customizeValue}
      />
   
    </div>
  );
};

export default AddAndEditMemberDialog;
