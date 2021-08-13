import React, { useEffect, useState } from "react";
import useSignUp from "./useSignUp";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from "@material-ui/core";
const DialogForLoginAndSignup = ({ open, setopen }) => {
  const [state2, setstate2] = useState([]);
  const [pageRefresh, setpageRefresh] = useState(null);
  useEffect(() => {
  }, [pageRefresh])
  //custom hook
  //sending data via object
  const data = { state2, setstate2, pageRefresh, setpageRefresh };
  const { addUpUser } = useSignUp(data);
  return (
    <div>
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <Box my={1}>
            <Container>
              <OutlinedInput
                onChange={(e) =>
                  setstate2({ ...state2, username: e.target.value })
                }
                placeholder="Username"
                fullWidth
              />
            </Container>
          </Box>

          <Box my={1}>
            <Container>
              <OutlinedInput
                onChange={(e) =>
                  setstate2({ ...state2, email: e.target.value })
                }
                placeholder="Email address"
                fullWidth
              />
            </Container>
          </Box>
          <Box>
            <Container>
              <OutlinedInput
                type="password"
                onChange={(e) =>
                  setstate2({ ...state2, password: e.target.value })
                }
                placeholder="Password"
                fullWidth
              />
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={addUpUser} variant="outlined">
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogForLoginAndSignup;
