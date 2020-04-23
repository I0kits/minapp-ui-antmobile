import { request } from "umi";

import conf from '../conf';

export default {
  list: (params = {}) => {
    const uri = conf.apiUrl('/api/questions');
    return request(uri, { method: 'get', ...params });
  },
  create: (data) => {
    const uri = conf.apiUrl('/api/questions');
    const opts = { method: 'post', data };
    return request(uri, opts);
  },
  show: (id)=> {
    return ()=> {
      const uri = conf.apiUrl(`/api/questions/${id}`);
      return request(uri, { method: "get" });
    }
  }
};
