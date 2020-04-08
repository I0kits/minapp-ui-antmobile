import React from "react";
import { createForm } from "rc-form";

import { useRequest } from "umi";
import { Flex, WhiteSpace, Button } from "antd-mobile";
import { Toast, InputItem, List, TextareaItem } from "antd-mobile";

import styles from "./form.css";
import conf from '../../../conf';
import api from "../../../apis/question";

const validateRules = {
  "title": { rules: [{ required: true }] },
  "subtitle": { rules: [{ required: true }] },
  "content": { rules: [{ required: false }] }
};

export default createForm()((props) => {
  const { getFieldProps, getFieldError } = props.form;
  const showErrorNotification = (msg) => Toast.info(msg);
  const hasError = (name) => !_.isEmpty(getFieldError(name));

  const { loading, run: doPost } = useRequest(api.create, {
    manual: true,
    onSuccess: (data) => props.history.push(conf.uris.main)
  });

  const addExtraDataAndPost = (dat)=> {
    //TODO: read current user info as the Author's ID.
    doPost({...dat, author_id: 1});
  };

  const handleSubmit = () => {
    if (props.data['updatedAt']) {
      showErrorNotification('您没有权限修改！');
      return;
    }

    props.form.validateFields((err, value) => {
      _.isNil(err)
        ? addExtraDataAndPost(value)
        : showErrorNotification("请输入必填字段!");
    });
  };

  return (
    <List>
      <InputItem
        clear
        placeholder="标题"
        error={hasError("title")}
        defaultValue={props.data['title']}
        {...getFieldProps("title", { ...validateRules["title"] })}>
      </InputItem>

      <InputItem
        clear
        placeholder="子标题"
        error={hasError("subtitle")}
        defaultValue={props.data['subtitle']}
        {...getFieldProps("subtitle", { ...validateRules["subtitle"] })}>
      </InputItem>

      <TextareaItem
        rows={3}
        error={hasError("content")}
        placeholder="问题内容"
        defaultValue={props.data['content']}
        {...getFieldProps("content", { ...validateRules["content"] })}
      />

      { props.data['createdAt'] &&
        <InputItem disabled defaultValue={props.data['createdAt']} editable={false}/>
      }

      { props.data['updatedAt'] &&
        <InputItem disabled defaultValue={props.data['updatedAt']} editable={false}/>
      }

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
