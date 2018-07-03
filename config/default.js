/*
 * Default configuration file
 */

module.exports = {
  // SETTINGS You have to set in Heroku
  MYSQL_URL: process.env.MYSQL_URL || 'mysql://root@127.0.0.1:3306/timetracker',
  JSON_WEB_TOKEN_SECRET: process.env.JWT_SECRET || 'mysecret',
  LOG_LEVEL: 'info',
  API_VERSION: 'v1',
  PORT: process.env.PORT || 4000,
};
