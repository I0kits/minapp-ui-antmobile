import _ from 'lodash';
import store from 'store2'

import config from '../conf'

const userStore = store.namespace(config.name);
const USER_INFO_KEY = `${config.name}@user-info-key`;

/**
 * Get current user info
 */
function current() {
  return userStore.session(USER_INFO_KEY);
}

/**
 * Set user info
 */
function set(dat) {
  userStore.session(USER_INFO_KEY, dat);
  return current()
}

/**
 * Update user info
 */
function update(dat) {
  //console.log('+++ update user info to localStore::', dat)
  return set(Object.assign({}, current(), dat));
}

/**
 * Clean user info
 */
function clean() {
  userStore.session(USER_INFO_KEY, null);
}

function token() {
  const user = current();
  return _.isNil(user) ? '' : user.token;
}

export { current, set, update, clean, token }
