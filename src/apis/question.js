import { request } from "umi";

export default {
  list: (params = {}) => {
    const uri = "/api/questions";
    return request(uri, { method: "get", ...params });
  },
  create: (data) => {
    const uri = "/api/questions";
    const opts = { method: "post", data };
    return request(uri, opts);
  },
  show: (id)=> {
    return ()=> {
      const uri = `/api/questions/${id}`;
      return request(uri, { method: "get" });
    }
  }
};
