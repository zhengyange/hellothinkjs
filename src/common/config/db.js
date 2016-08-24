'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'think_demo',
      user: 'thinkjs',
      password: '88888888',
      prefix: 'think_',
      encoding: 'utf8',
      log_sql: true,
      log_connect: true,
    },
    mongo: {

    }
  }
};