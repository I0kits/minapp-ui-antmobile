import {request} from 'umi';

import conf from '../conf';

export default {
  register: async (data)=> {
    const uri = '/api/authors';
    const opts = {method: 'post', data};
    return request(conf.apiUrl(uri), opts);
  }
}
