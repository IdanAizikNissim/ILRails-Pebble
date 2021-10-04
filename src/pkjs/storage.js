var Settings = require('pebblejs/settings');

var put = function (key, value) {
  Settings.data(key, value);
};

var get = function (key) {
  return Settings.data(key);
};

var indexOf = function (key, value) {
  var v = get(key);
  
  if (v) {
    for (var i = 0; i < v.length; ++i) {
      if (v[i] === value) {
        return i;
      }
    }
  }

  return -1;
};

var append = function (key, value) {
  var v = get(key);
  
  if (!v) {
    v = [value];
  } else {
    if (Array.isArray(v)) {
      v.push(value);
    } else {
      v = [v, value];
    }
  }
  
  put(key, v);
};

var truncate = function (key, value) {
  var i = indexOf(key, value);
  
  if (i != -1) {
    var v = get(key);
    var t = v.splice(i, 1);
    put(key, v);
    
    return t;
  }
  
  return null;
};

var contains = function (key, value) {
  return indexOf(key, value) !== -1;
};


// EXPORT
module.exports = {
  get: get,
  put: put,
  append: append,
  truncate: truncate,
  contains: contains,
  indexOf: indexOf,
  keys: {STATIONS: 'station', FAV_STATIONS: 'fav_stations', ROUTES: 'routes', DEF_LANG: 'def_lang'}
};