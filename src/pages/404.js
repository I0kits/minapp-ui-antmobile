import React from "react";
import { Link } from "umi";

export default (props) => {
  return (
    <div>
      未找到您访问的资源.
      <br/>
      <Link to='/main'>返回主目录</Link>。
    </div>
  );
}
