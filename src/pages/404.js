import React from "react";
import { Link } from "umi";

import conf from '../conf';

function NoFoundPage(props) {
  return (
    <div>
      未找到您访问的资源.
      <br/>
      <Link to={conf.uris.root}>返回主目录</Link>。
    </div>
  );
}

NoFoundPage.title = '404';

export default NoFoundPage;
