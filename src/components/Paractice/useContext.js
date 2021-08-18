import React from "react";
const User = React.createContext();
// context methods
export const userProvider = User.Provider; //i am provider and i am responsible to provide values to all my childs
export const userConsumer = User.Consumer; //i am consumer, and i am responsiblen to 
