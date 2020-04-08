import {request} from 'umi';

export default {
  register: async (data)=> {
    const uri = '/api/authors';
    const opts = {method: 'post', data};
    return request(uri, opts);
  }
}
