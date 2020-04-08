import React from "react";
import { useRequest } from "umi";
import { Icon, Flex, WhiteSpace } from "antd-mobile";

import styles from './index.css';
import api from '../../apis/login';
import { update } from "../../helper/current-user";

export default (props) => {
  const {data, error } = useRequest(api.check);
  const go = (uri)=> setTimeout(()=> props.history.push(uri), 300);

  let msg = '检查登录状态...';

  if (error) {
    msg = '请先登录...';
    go('/login');
  } else if (data) {
    update(data);
    msg = `欢迎 ${data.name}`;
    go('/main');
  }

  return (
    <Flex justify="center" align="center" alignContent="center" className={styles.root}>
      <Flex.Item>
        <Icon type="loading" size="lg"/>
        <WhiteSpace size="lg"/>
        <span>{msg}</span>
      </Flex.Item>
    </Flex>
  );
}
