import _ from "lodash";
import React from "react";
import { Link, NavLink, useRequest } from "umi";
import { Icon, List, Pagination } from "antd-mobile";

import conf from '../../conf';
import styles from "./index.css";
import api from "../../apis/question";
import { current, clean } from "../../helper/current-user";

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
  return (<div>
    暂无数据， 你可以「<NavLink to={conf.uris.questionCreate}>新建</NavLink>」
    <br/><br/>
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

const renderChildren = (loading, data, error) => {
  if (loading) {
    return (<div>
      数据读取中...
      <Icon type="loading" size="lg"/>
    </div>);
  }

  if (error) {
    return (<div style={{ color: "red" }}>
      读取数据失败：{error.message}
    </div>);
  }

  if (_.isEmpty(data.rows)) {
    return renderEmptyDataPanel();
  } else {
    return renderQuestionDataList(data.rows);
  }
};

function MainPage (props) {
  const user = current();
  const { loading, data, error } = useRequest(api.list);

  return (
    <List renderFooter={() => renderFooter(props, data)}>
      {renderChildren(loading, data, error)}
    </List>
  );
}
MainPage.title = '问题列表';

export default MainPage;
