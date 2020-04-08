import _ from "lodash";
import React from "react";
import { createForm } from "rc-form";

import { useRequest } from "umi";
import { WhiteSpace, TextareaItem } from "antd-mobile";
import { List, InputItem, Button, Flex, Toast } from "antd-mobile";

import styles from "./index.css";
import api from "../../apis/authors";

const validateRules = {
  "name": { rules: [{ required: true }] },
  "account": { rules: [{ required: true }] },
  "password": { rules: [{ required: true }] },
  "description": { rules: [{ required: false }] }
};

export default createForm()((props) => {
  const { getFieldProps, getFieldError } = props.form;
  const showErrorNotification = (msg) => Toast.info(msg);
  const hasError = (name) => !_.isEmpty(getFieldError(name));

  const pathname = '/register/confirm';
  const { loading, run: doPost } = useRequest(api.register, {
    manual: true,
    onSuccess: ([author, account]) => {
      props.history.push({ pathname, state: { author, account } });
    }
  });

  const handleSubmit = () => {
    props.form.validateFields((err, value) => {
      _.isNil(err)
        ? doPost(value)
        : showErrorNotification("请输入必填字段!");
    });
  };

  return (
    <List renderHeader={() => "注册新用户..."}>
      <InputItem
        clear
        placeholder="昵称"
        error={hasError("account")}
        {...getFieldProps("name", { ...validateRules["account"] })}>
      </InputItem>

      <InputItem
        clear
        placeholder="账号"
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

      <TextareaItem
        rows={3}
        error={hasError("password")}
        placeholder="请输入个人简介和说明"
        {...getFieldProps("description", { ...validateRules["password"] })}
      />

      <WhiteSpace size="lg"/>

      <Flex className={styles.actions}>
        <Flex.Item>
          <Button type="primary" icon="check-circle-o" loading={loading} onClick={handleSubmit}>
            确定
          </Button>
        </Flex.Item>
        <Flex.Item>
          <Button onClick={() => props.history.goBack()}>取消</Button>
        </Flex.Item>
      </Flex>

      <WhiteSpace/>
    </List>
  );
});
