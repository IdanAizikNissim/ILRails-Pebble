var Settings = require('settings');

var put = function (key, value) {
  Settings.data(key, value);
};

var get = function (key) {
  return Settings.data(key);
};

// EXPORT
module.exports = {
  get: get,
  put: put,
  keys: {STATIONS: 'station'}
};