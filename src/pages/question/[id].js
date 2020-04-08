import React from "react";

import { useRequest } from "umi";
import { Icon } from "antd-mobile";

import Form from "./components/form";

import api from "../../apis/question";

export default (props) => {
  const id = props.match.params.id;
  const { loading, data, error } = useRequest(api.show(id));

  console.log("loading:", loading);
  console.log("data:", data);
  console.log("error:", error);

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
    <div>SHow detailssss with FORM</div>
  )
};
