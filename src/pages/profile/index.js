import React from "react";
import { Link } from "umi";

import conf from '../../conf';

function ProfilePage(props) {
  return (
    <div style={{color: '#000'}}>
      TODO：显示当前用户信息，并能修改密码..
      <br/>
      <Link to={conf.uris.main}>返回</Link>。
    </div>
  );
}

ProfilePage.title = '我的信息';

export default ProfilePage;
