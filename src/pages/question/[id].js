import React from "react";

import { useRequest } from "umi";
import { Icon } from "antd-mobile";

import Form from "./components/form";

import api from "../../apis/question";

function QuestionDetailPage(props) {
  const id = props.match.params.id;
  const { loading, data, error } = useRequest(api.show(id));

  if (loading) {
    return (<div>
      数据读取中...
      <Icon type="loading" size="lg"/>
    </div>);
  }

  if (error) {
    return (<div style={{color: 'red'}}>
      读取数据失败：{error.message}
    </div>)
  }

  return (
    <Form data={data} {...props}/>
  )
}

QuestionDetailPage.title = '查看详细信息';

export default QuestionDetailPage;
