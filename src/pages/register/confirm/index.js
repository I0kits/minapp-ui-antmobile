import React from "react";
import { Link } from "umi";

export default (props) => {
  const { author, account } = props.history.location.state;

  return (
    <div>
      「{author.name}」已经注册成功，请使用账号「{account.account}」
      <Link to='/login'>登录</Link>。
    </div>
  );
}
