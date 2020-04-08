import _ from "lodash";
import React from "react";
import { Link } from "umi";
import { Flex } from "antd-mobile";

import conf from "../conf";
import styles from "./index.less";
import { current, clean } from "../helper/current-user";

const getActions = (props) => {
  const user = current();
  return _.isNil(user) ? [] : [
    { uri: conf.uris.root, text: "退出", opts: { onClick: clean } },
    { uri: conf.uris.profile, text: user.name, opts: {} },
    { uri: conf.uris.questionCreate, text: "+新建", opts: {} }
  ];
};

const renderActions = (props) => {
  const actions = getActions(props);
  if (_.isEmpty(actions)) {
    return null;
  }

  const renderAction = (action, idx) => {
    return (
      <li key={idx}>
        <Link to={action.uri} {...action.opts}>
          {action.text}
        </Link>
      </li>
    );
  };

  return (<ul>{actions.map(renderAction)}</ul>);
};

const titles = {};
const getTitle = (path, routes) => {
  console.log('path:', path);
  console.log('routes:', routes);
  if (_.isNil(titles[path])) {
    const route = _.find(routes, { path });
    console.log(route);
    titles[path] = _.get(route, 'component.title', 'No title');
  }

  return titles[path];
};

export default (props) => {
  console.log(props);
  const routes = props.route.routes;
  const path = props.location.pathname;

  const title = getTitle(path, routes);
  return (
    <div className={styles.banner}>
      <Flex>
        <Flex.Item>
          <header>{title}</header>
          {renderActions(props)}
        </Flex.Item>
      </Flex>
      {props.children}
    </div>
  );
};
