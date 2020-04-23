import _ from "lodash";
import React from "react";
import { Link, NavLink, useRequest } from "umi";
import { Icon, List, Pagination } from "antd-mobile";

import conf from "../../conf";
import styles from "./index.css";
import api from "../../apis/question";

const [Item, Brief] = [List.Item, List.Item.Brief];

const renderFooter = (props, data) => {
  return (
    <Pagination total={1} current={1}
                className={styles["custom-pagination-with-icon"]}
                locale={{
                  prevText: (<span className={styles["arrow-align"]}><Icon type="left"/>上一步</span>),
                  nextText: (<span className={styles["arrow-align"]}>下一步<Icon type="right"/></span>)
                }}/>
  );
};

const renderEmptyDataPanel = () => {
  return (<div style={{ color: "#000" }}>
    暂无数据， 你可以「<NavLink to={conf.uris.questionCreate}>新建</NavLink>」
    <br/><br/>
  </div>);
};

const renderLoadingTips = () => {
  return (
    <div>
      数据读取中...
      <Icon type="loading" size="lg"/>
    </div>
  );
};

const renderErrorPanel = (error, props) => {
  if (error.message === "No authorization token was found") {
    setTimeout(() => props.history.push(conf.uris.login), 500);
  }

  return (<div style={{ color: "red" }}>
    读取数据失败：{error.message}
  </div>);
};

const renderQuestionDataList = (questions) => {
  return questions.map(q => {
    return (
      <Item wrap multipleLine align="top" key={q.id}>
        {q.title}
        <Brief className={styles.author}>{q.author || "Rex"}，{q.updatedAt}</Brief>
        <Brief className={styles.content}>
          <Link to={conf.uris.questionWithId(q.id)}>{q.subtitle}</Link>
        </Brief>
        <div className={styles.actions}>
          <NavLink to="#">
            <Icon type="check-circle-o" size="sm"/>
          </NavLink>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to="#">
            <Icon type="search" size="sm"/>
          </NavLink>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to={conf.uris.questionWithId(q.id)}>
            <Icon type="ellipsis" size="sm"/>
          </NavLink>
        </div>
      </Item>
    );
  });
};

const renderChildren = (loading, data, error, props) => {
  if (loading) {
    return renderLoadingTips();
  }

  if (error) {
    return renderErrorPanel(error, props);
  }

  return _.isEmpty(data.rows)
    ? renderEmptyDataPanel()
    : renderQuestionDataList(data.rows);
};

function MainPage(props) {
  const { loading, data, error } = useRequest(api.list);
  return (
    <List renderFooter={() => renderFooter(props, data)}>
      {renderChildren(loading, data, error, props)}
    </List>
  );
}

MainPage.title = "问题列表";

export default MainPage;
