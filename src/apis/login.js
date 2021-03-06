import _ from 'lodash';
import {request} from 'umi';

import conf from '../conf';
import {token} from '../helper/current-user';

export default {
  check: async () => {
    const dat = token();
    if (_.isEmpty(dat)) {
      return Promise.reject({success: false, message: 'invalid token!'})
    }

    const uri = '/api/check';
    const opts = {method: 'get', headers: {Authorization: `Bearer ${dat}`}};
    return request(conf.apiUrl(uri), opts);
  },
  login: async (data) => {
    const uri = '/api/login';
    const opts = {method: 'post', data};
    return request(conf.apiUrl(uri), opts);
  }
}
