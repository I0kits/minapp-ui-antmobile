import React from "react";
import { Link } from "umi";

import conf from '../../../conf';

function RegisterConfirmPage(props) {
  const { name, account } = props.history.location.state;

  return (
    <div style={{color: '#000'}}>
      「{name}」已经注册成功，请使用账号「{account}」
      <Link to={conf.uris.login}>登录</Link>。
    </div>
  );
}

RegisterConfirmPage.title = '账号注册成功';

export default RegisterConfirmPage;
