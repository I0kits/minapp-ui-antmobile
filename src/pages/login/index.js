import React from "react";
import { createForm } from "rc-form";

import { useRequest } from "umi";
import { List, InputItem, Button } from "antd-mobile";
import { WhiteSpace, NoticeBar, Flex, Toast } from "antd-mobile";

import conf from '../../conf';
import api from "../../apis/login";
import { update } from "../../helper/current-user";

const validateRules = {
  "account": { rules: [{ required: true }] },
  "password": { rules: [{ required: true }] }
};

const loginPage = (props) => {
  const { getFieldProps, getFieldError } = props.form;
  const showErrorNotification = (msg) => Toast.info(msg);
  const hasError = (name) => !_.isEmpty(getFieldError(name));


  const { loading, run: doLogin } = useRequest(api.login, {
    manual: true,
    onSuccess: (user) => {
      update(user);
      props.history.push(conf.uris.main);
    }
  });

  const handleLogin = () => {
    props.form.validateFields((err, value) => {
      _.isNil(err)
        ? doLogin(value)
        : showErrorNotification("请输入必填字段!");
    });
  };

  return (
    <List>
      <InputItem
        clear
        placeholder="用户名称"
        error={hasError("account")}
        {...getFieldProps("account", { ...validateRules["account"] })}>
      </InputItem>

      <InputItem
        type="password"
        name="password"
        placeholder="密码"
        error={hasError("password")}
        {...getFieldProps("password", { ...validateRules["password"] })}>
      </InputItem>

      <WhiteSpace size="lg"/>
      <Flex style={{ margin: "0 5px" }}>
        <Flex.Item>
          <Button type="primary" icon="check-circle-o" loading={loading}
                  onClick={handleLogin}>
            登录
          </Button>
        </Flex.Item>
        <Flex.Item>
          <Button onClick={() => props.history.push(conf.uris.register)}>注册</Button>
        </Flex.Item>
      </Flex>

      <WhiteSpace/>

      <NoticeBar>
        请使用：「admin : 123」 或 「guest : 456」登录系统。
      </NoticeBar>

      <WhiteSpace/>
    </List>
  );
};

const loginForm = createForm()(loginPage);
loginForm.title = '请登录';

export default loginForm;
