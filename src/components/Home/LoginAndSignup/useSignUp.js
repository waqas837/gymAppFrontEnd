import React, { useState } from "react";
import axios from "axios";
import { userApi } from "../../../Api";
import toast from "react-hot-toast";

const useSignUp = (parms) => {
    const [pageRefresh, setpageRefresh] = useState(null);
    // add user by the admin it is not admin signup self
    //  console.log(parms);
  const addUpUser = async () => {
    if (parms.state2.username === undefined) {
      toast.error(`Username is required`);
    } else if (parms.state2.email === undefined) {
      toast.error(`Email is required`);
    } else if (parms.state2.password === undefined) {
      toast.error(`Password is required`);
    }
    try {
      const { data } = await axios.post(`${userApi}/signupUser`, {
        username: parms.state2.username,
        email: parms.state2.email,
        password: parms.state2.password,
      });
      if (data.userExists) {
        toast.error(`${data.userExists}`);
      }

      if (data.success) {
        parms.setopen(false);
        parms.setpageRefresh(!parms.pageRefresh);
      }
    } catch (error) {
      toast.error("Invalid Email");
      console.log(error);
    }
  };
  return { addUpUser };
};

export default useSignUp;
