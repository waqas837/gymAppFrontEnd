import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { coursesApi, imgUrl } from "../../Api";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableContainer,
  Paper,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import {
  Add,
  AddCircleOutline,
  CheckCircleOutline,
  CloseOutlined,
  ErrorOutline,
} from "@material-ui/icons";
import { MainSecondary, useStyles } from "./Main.Styles";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

const CoursesHandle = () => {
  // let send data by the header but first get them from the cookies
  const admin = Cookies.get("admin");
  const headers = {
    authorization: `Bearer ${admin}`,
  };
  const classes = useStyles();
  const [open, setopen] = React.useState(false);
  const [delet, setdelet] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [age2, setAge2] = React.useState("");
  const [opentwo, setopentwo] = React.useState(false);
  const [pageRefresh, setpageRefresh] = React.useState(false);
  const [CourseData, setCourseData] = React.useState([]);
  const [showCourses, setshowCourses] = React.useState([]);
  const [user, setuser] = React.useState("NoSelection");
  const [openCustomize, setopenCustomize] = React.useState(false);
  const [openLanguage, setopenLanguage] = React.useState(false);
  const [difficultyDialog, setdifficultyDialog] = React.useState(false);
  const [showLanguages, setshowLanguages] = React.useState([]);
  const [showlevels, setshowlevels] = React.useState([]);
  const [state, setstate] = useState();
  const [state2, setstate2] = useState();
  const [img, setimg] = useState("");
  const [instruct, setinstruct] = useState([]);
  const [customizeValue, setcustomizeValue] = useState("No selection");
  const [edited, setedited] = useState("");
  const [file, setfile] = useState("");
  const [openInsProf, setopenInsProf] = useState(false);
  // update profile image of instructor
  const setimage = (e) => {
    setfile(e.target.files[0]);
  };
  // update Image
  const updateImage = async (e) => {
    e.preventDefault();
    const fdata = new FormData();
    fdata.append("image", file);

    try {
      const { data } = await axios.patch(
        `${coursesApi}/updateInstructorProfile/${edited._id}`,
        fdata,{headers}
      );
      if (data.success) {
        toast.success("Image update succeed!");
        setopenInsProf(false);
        setpageRefresh(!pageRefresh);
      }
    } catch (error) {
      console.log(error);
      toast.error("No Image was selected !");
    }
  };
  // 0.get instructor
  const getInstructorForUpdate = async () => {
    try {
      const { data } = await axios.get(`${coursesApi}/getInstructors`,{headers});
      // console.log(data.findData);
      setinstruct(data.findData);
    } catch (error) {
      console.log(error);
    }
  };
  // uplaod Profile
  const uplaodProfile = async (e, id) => {
    if (!img) {
      toast.error("Provide an image!");
    }
    e.preventDefault();
    var fData = new FormData();
    fData.append("image", img);
    try {
      const { data } = await axios.post(
        `${coursesApi}/addInstructorProfile/${id}`,
        fData,{headers}
      );
      if (data.success) {
        setpageRefresh(!pageRefresh);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //find first edited data and we match it
  const editUser = (id) => {
    const findedData = showCourses.find((val) => val._id === id);
    setedited(findedData);
    setopenCustomize(true);
    getInstructorForUpdate();
  };
  // add finally lang course
  const addFinallyLanguageToCourse = async () => {
    try {
      const { data } = await axios.post(
        `${coursesApi}/addFinallyLanguageToCourse/${window.Lid}/${window.lang}`,{headers}
      );
      if (DataTransferItemList) {
        setpageRefresh(!pageRefresh);
        setopenCustomize(false);
        setopenLanguage(false);
        // console.log(data.findData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add finally level course
  const addFinallyLevelToCourse = async () => {
    try {
      const { data } = await axios.post(
        `${coursesApi}/addFinallyLevelToCourse/${window.id}/${window.levelVal}`,{headers}
      );
      if (data) {
        setpageRefresh(!pageRefresh);
        setdifficultyDialog(false);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add a custom language field
  const updateCourse = async () => {
    try {
      const { data } = await axios.patch(
        `${coursesApi}/updatCourse/${edited._id}`,
        state2,{headers}
      );
      // setopenCustomize(true);
      if (data.success) {
        setcustomizeValue("languageCustomize");
        setpageRefresh(!pageRefresh);
        setopenLanguage(false);
        setopenCustomize(false);
        toast.success("Operation succeed!");
        setopenInsProf(true);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //get all the courses data
  const getAllCourses = async () => {
    
    try {
      const { data } = await axios.get(`${coursesApi}/getAllCourseData`,{headers});
      console.log(data.newData);
      setshowCourses(data.newData);
    } catch (error) {
      console.log(error);
    }
  };
  // then call it in useEffect
  const handleChangeLang = (event, child) => {
    setAge2(event.target.value);
    window.lang = child.props.children;
  };
  useEffect(() => {
    getAllCourses();
  }, [pageRefresh]);
  // create new course
  const createNewCourse = async () => {
    try {
      const { data } = await axios.post(`${coursesApi}/addNewCourse`, {
        coursename: CourseData.coursename,
        link: CourseData.link,
        coursedesc: CourseData.coursedesc,
        instructordesc: CourseData.instructordesc,
        instructorname: window.instructorname,
      },{headers});
      if (data.success) {
        setpageRefresh(!pageRefresh);
        setopen(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event, child) => {
    setAge(event.target.value);
    // console.log(child.props.children);
    setstate2({ ...state2, instructorname: child.props.children });
  };

  //course customization
  const courseCustomization = () => {
    setcustomizeValue("courseCustomize");
    setopenCustomize(true);
  };
  //language customization
  const languageCustomization = () => {
    setcustomizeValue("languageCustomize");
    setopenCustomize(true);
  };

  // 1.Add a course
  const addUser = async () => {
    setopen(true);
    setuser("AddCourse");
    try {
      const { data } = await axios.get(`${coursesApi}/getInstructors`,{headers});
      console.log(data.findData);
      setinstruct(data.findData);
    } catch (error) {
      console.log(error);
    }
  };
  //   close both dialogs
  const closeBothDialogs = () => {
    setopen(false);
    setopentwo(false);
  };
  // 2.Delelet a course
  const delelteCourse = async (id) => {
    setloading(true);
    try {
      const { data } = await axios.delete(`${coursesApi}/deleteACourse/${id}`,{headers});
      console.log(data);
      // open record deleted dialog that data was deleted
      if (data.success) {
        setopentwo(true);
        setpageRefresh(!pageRefresh);
        setTimeout(() => {
          setopentwo(false);
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  return (
    <div>
      {/* navbar */}
      <Navbar />
      <Toaster />
      <Box mt={10} ml={25} className={classes.resposiveFromSide}>
        <Container maxWidth="md">
          {/* line 0 */}
          <Grid container>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              {/* just divide into 6 coloumns */}
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box textAlign="right">
                {/* Level icon */}
                {/* <IconButton>
                  <SignalCellularAlt fontSize="small" style={{ color: MainSecondary }} />
                </IconButton> */}
                {/* Language icon */}
                {/* <IconButton onClick={addUser}>
                  <GTranslate fontSize="small" style={{ color: MainSecondary }} />
                </IconButton> */}
                {/* add icon */}
                <IconButton onClick={addUser}>
                  <Add fontSize="small" style={{ color: MainSecondary }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          {/* line for the table */}
          <Box mt={2}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TableContainer
                  component={Paper}
                  elevation={4}
                  style={{ borderRadius: "0px" }}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ color: MainSecondary, fontWeight: "bold" }}
                        >
                          Course Name
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{ color: MainSecondary, fontWeight: "bold" }}
                        >
                          Course Link
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ color: MainSecondary, fontWeight: "bold" }}
                        >
                          Instructor Profile
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: MainSecondary, fontWeight: "bold" }}
                        >
                          Course Description
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: MainSecondary, fontWeight: "bold" }}
                        >
                          Instructor Name
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{ color: MainSecondary, fontWeight: "bold" }}
                        >
                          Instructor Description
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: MainSecondary, fontWeight: "bold" }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* row */}
                      {showCourses.map((val) => (
                        <TableRow>
                          {/* course name */}
                          <TableCell align="left">
                            <Typography variant="subtitle2">
                              {val.coursename}
                            </Typography>
                            {/* instructor name */}
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2">
                              {val.link}
                            </Typography>
                          </TableCell>
                          {/* instructor profile */}
                          <TableCell>
                            {val.instructorimage ? (
                              <img
                                src={`${imgUrl}/${val.instructorimage}`}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 100,
                                }}
                                alt=""
                              />
                            ) : (
                              <form
                                onSubmit={(e) => uplaodProfile(e, val._id)}
                                encType="multipart/form-data"
                              >
                                <input
                                  name="image"
                                  onChange={(e) => setimg(e.target.files[0])}
                                  type="file"
                                  style={{ fontSize: "10px" }}
                                />
                                <input type="submit" value="upload" />
                              </form>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2">
                              {val.coursedesc}
                            </Typography>
                          </TableCell>
                          {/* select a level for category */}
                          <TableCell>{val.instructorname}</TableCell>
                          {/* select a language */}
                          <TableCell align="center">
                            {val.instructordesc}
                          </TableCell>
                          <TableCell align="right">
                            <ButtonGroup orientation="horizontal">
                              <Button
                                size="small"
                                className={classes.buttonStyle}
                                onClick={() => editUser(val._id)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                className={classes.buttonStyleOutlined}
                                onClick={() => delelteCourse(val._id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      {/* dialog for delete confirmation */}
      <Dialog open={delet} onClose={() => setdelet(false)}>
        <Box pl={25} pr={25}></Box>
        <Box textAlign="center">
          <ErrorOutline
            style={{
              fontSize: "100px",
              color: "rgb(240,190,148)",
              fontWeight: "lighter",
              marginTop: "10px",
            }}
          />
        </Box>
        <DialogContent>
          <Box textAlign="center">
            <Typography variant="h6">Confirm Delete</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ background: "grey", marginBottom: "10px" }}
            variant="contained"
            size="small"
            onClick={() => setdelet(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{
              background: MainSecondary,
              color: "white",
              marginBottom: "10px",
            }}
            // onClick={openOneDialog}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* pressed ok and record deleted */}
      <Dialog open={opentwo} onClose={() => setopentwo(false)}>
        <Box pl={25} pr={25}></Box>
        <Box textAlign="center">
          <CheckCircleOutline
            style={{
              fontSize: "100px",
              color: "rgb(170,219,133)",
              fontWeight: "lighter",
              marginTop: "10px",
            }}
          />
        </Box>
        <DialogContent>
          <Box textAlign="center">
            <Typography variant="h6">Record deleted</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={closeBothDialogs}
            style={{ marginBottom: "10px" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* <MainDialog
        user={user}
        open={open}
        pageRefresh={pageRefresh}
        setpageRefresh={setpageRefresh}
        userData={window.sendData}
        setopen={setopen}
      /> */}
      {/* Add course dialog */}
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-around">
            <Typography
              style={{ fontWeight: "bold", textAlign: "center" }}
              variant="h6"
            >
              Add Course
            </Typography>
            <IconButton
              onClick={() => setopen(false)}
              style={{ marginTop: -5, marginLeft: "auto" }}
            >
              <CloseOutlined fontSize="small" color="secondary" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box my={1}>
            <Container>
              <OutlinedInput
                onChange={(e) =>
                  setCourseData({
                    ...CourseData,
                    coursename: e.target.value,
                  })
                }
                placeholder="Course Name"
                fullWidth
                className={classes.input}
              />
            </Container>
          </Box>

          <Box my={1}>
            <Container>
              <OutlinedInput
                onChange={(e) =>
                  setCourseData({
                    ...CourseData,
                    link: e.target.value,
                  })
                }
                placeholder="Insert Course Video Link"
                fullWidth
                className={classes.input}
              />
            </Container>
          </Box>
          {/* course description */}
          <Box my={1}>
            <Container>
              <OutlinedInput
                multiline
                rows={4}
                onChange={(e) =>
                  setCourseData({
                    ...CourseData,
                    coursedesc: e.target.value,
                  })
                }
                placeholder="Course Description"
                fullWidth
              />
            </Container>
          </Box>
          {/* select an instructor,bring these values from backend */}
          <Box my={2} textAlign="center">
            <FormControl className={classes.formControl2}>
              <InputLabel style={{ marginTop: "4px" }}>
                Select Instructor
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                {instruct.map((val, index) => (
                  <MenuItem value={index}>{val.username}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* instructor description */}
          <Box my={1}>
            <Container>
              <OutlinedInput
                multiline
                rows={4}
                onChange={(e) =>
                  setCourseData({
                    ...CourseData,
                    instructordesc: e.target.value,
                  })
                }
                placeholder="Instructor Description"
                fullWidth
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
                onClick={createNewCourse}
              >
                Add Course
              </Button>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>

      {/* dialog for select difficulty level for courses */}
      <Dialog
        open={difficultyDialog}
        onClose={() => setdifficultyDialog(false)}
      >
        <DialogTitle>
          <Typography style={{ fontWeight: "bold" }} variant="h6">
            Select Category Level
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* COURSES Level dialog*/}
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
                  {showlevels.map((val, index) => (
                    <MenuItem value={index}>{val}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* add a new level course ICON */}

              <IconButton onClick={courseCustomization}>
                <AddCircleOutline color="secondary" fontSize="small" />
              </IconButton>
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addFinallyLevelToCourse}
            variant="outlined"
            size="small"
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog for select difficulty level for courses */}
      <Dialog open={openLanguage} onClose={() => setopenLanguage(false)}>
        <DialogTitle>
          <Typography style={{ fontWeight: "bold" }} variant="h6">
            Select a Language
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* languages dialog*/}
          <Box my={2}>
            <Container>
              <FormControl className={classes.formControl2}>
                <InputLabel style={{ marginTop: "4px" }}>
                  Select Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age2}
                  onChange={handleChangeLang}
                >
                  {showLanguages.map((val, index) => (
                    <MenuItem value={index}>{val}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* add a new lanaguge ICON */}

              <IconButton onClick={languageCustomization}>
                <AddCircleOutline color="secondary" fontSize="small" />
              </IconButton>
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addFinallyLanguageToCourse}
            variant="outlined"
            size="small"
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog for update course */}
      <div>
        <Dialog open={openCustomize} onClose={() => setopenCustomize(false)}>
          <DialogTitle>
            <Box mb={3} display="flex" justifyContent="space-around">
              <Typography variant="h6">Edit Course</Typography>
              <IconButton
                onClick={() => setopenCustomize(false)}
                style={{ marginTop: -5 }}
              >
                <CloseOutlined fontSize="small" color="secondary" />
              </IconButton>
            </Box>

            <React.Fragment>
              <Box my={1}>
                <OutlinedInput
                  defaultValue={edited.coursename}
                  placeholder="Course name"
                  style={{ height: "30px", borderRadius: 0 }}
                  onChange={(e) =>
                    setstate2({ ...state2, coursename: e.target.value })
                  }
                />
              </Box>

              <Box my={1}>
                <OutlinedInput
                  defaultValue={edited.link}
                  placeholder="Course Link"
                  style={{ height: "30px", borderRadius: 0 }}
                  onChange={(e) =>
                    setstate2({ ...state2, link: e.target.value })
                  }
                />
              </Box>

              {/* select an instructor,bring these values from backend */}
              <Box my={2} textAlign="center">
                <FormControl className={classes.formControl2}>
                  <InputLabel style={{ marginTop: "4px" }}>
                    Select Instructor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                  >
                    {instruct.map((val, index) => (
                      <MenuItem value={index}>{val.username}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box my={1}>
                <OutlinedInput
                  multiline
                  rows={4}
                  defaultValue={edited.coursedesc}
                  placeholder="Couse Description"
                  onChange={(e) =>
                    setstate2({ ...state2, coursedesc: e.target.value })
                  }
                />
              </Box>

              <Box my={1}>
                <OutlinedInput
                  multiline
                  rows={4}
                  defaultValue={edited.instructordesc}
                  placeholder="Instructor Description"
                  onChange={(e) =>
                    setstate2({ ...state2, instructordesc: e.target.value })
                  }
                />
              </Box>

              <DialogActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  style={{ borderRaduis: 0 }}
                  onClick={updateCourse}
                >
                  Update Course
                </Button>
              </DialogActions>
            </React.Fragment>
          </DialogTitle>
        </Dialog>
      </div>
      {/* image updata mini-dialog */}
      <Dialog open={openInsProf} onClose={() => setopenInsProf(false)}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-evenly">
            <Typography variant="h6">Update Instructor Profile</Typography>
            <IconButton
              style={{ marginTop: -8 }}
              onClick={() => setopenInsProf(false)}
            >
              <CloseOutlined fontSize="small" color="secondary" />
            </IconButton>
          </Box>
          <form onSubmit={updateImage}>
            <input type="file" name="image" onChange={setimage} />
            <Button
              onClick={updateImage}
              variant="contained"
              size="small"
              color="primary"
            >
              Upload
            </Button>
          </form>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default CoursesHandle;
