import React from "react";

import Form from "./components/form";

function QuestionCreatePage(props) {
  const defaultValues = {}; // default value for question
  return (
    <Form data={defaultValues} {...props}/>
  );
}

QuestionCreatePage.title = '创建新问题';

export default QuestionCreatePage;
