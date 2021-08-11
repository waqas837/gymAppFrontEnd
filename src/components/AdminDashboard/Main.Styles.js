import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";
var Maingrey = grey[400];
var MainSecondary = "rgb(233,30,99)";
const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    background: MainSecondary,
    color: "white",
    borderRadius:"50px",
    "&:hover":{
      background: MainSecondary,
    }
  },
  buttonStyleOutlined: {
    border:`2px solid ${MainSecondary}`,
    borderRadius:"50px"
  },
  resposiveFromSide:{
     [theme.breakpoints.down('sm')]:{
       width:"100%",
       marginLeft:"-10px"
     }
  },
  input:{
    height:"35px",
    borderRadius:"50px"
  },
  formControl: {
    minWidth: 160,
  },
  formControl2: {
    minWidth: 160,
    marginTop:"-15px"
  },
  card:{
    width:"230px",
    [theme.breakpoints.down('sm')]:{
      marginLeft:"-70px"
    }
  }
}));

export { Maingrey, MainSecondary, useStyles };
