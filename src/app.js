import 'normalize.css';
import _ from 'lodash';
import FastClick from 'fastclick';

import { token } from './helper/current-user';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', ()=> {
    FastClick.attach(document.body);
  }, false);
}

if(!window.Promise) {
  require('es6-promise').polyfill();
}

const addToken = (url, opts)=> {
  opts.credentials = 'omit';

  if (!_.startsWith(url, '/api/login') && _.isEmpty(opts.headers.Authorization)) {
    opts.headers.Authorization = `Bearer ${token()}`;
  }

  //console.log('[%s] to [%s] with:', opts.method, url, opts);
  return { url, opts };
};

export const request = {
  timeout: 60000,
  requestInterceptors: [addToken],
  errorConfig: {
    adaptor: (data, { req, res })=> {
      const ret = _.isObject(data) ? data : {data};

      if (!_.has(ret, 'errorCode')) {
        ret.errorCode = res.status;
      }

      if (!_.has(ret, 'errorMessage')) {
        ret.errorMessage = res.statusText;
      }

      if (!_.has(ret, 'success')) {
        ret.success = res.status === 200;
      }

      return ret;
    }
  }
};
