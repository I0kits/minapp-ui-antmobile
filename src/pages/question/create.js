import React from "react";

import Form from "./components/form";

export default (props) => {
  const defaultValues = {}; // default value for question
  return (
    <Form data={defaultValues} {...props}/>
  );
};
