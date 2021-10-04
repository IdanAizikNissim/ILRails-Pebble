var ajax = require('pebblejs/lib/ajax');

// MARK: API
// #########
var API = 'https://www.rail.co.il/apiinfo/api/';

// GET_ROUTES
// 
// oId: origin train station id
// tId: target train station id
// date: Date
// callback: Function
var getRoutes = function(oId, tId, date, callback) {
  // Build url
  var apiDate = getDateInApiFormat(date);
  var url = API + 'Plan/GetRoutes?OId=' + oId + 
      '&TId=' + tId + 
      '&Date=' + apiDate[0] + 
      '&Hour=' + apiDate[1];
  
  makeReq(url, callback);
};

// GET_STATIONS
var getStations = function(callback) {
  makeReq(API + 'plan/GetStations', callback);
};

// MARK: API helpers
// #################

// MAKE REQUEST
// url
// callback (err, date)
var makeReq = function(url, callback) {
  ajax({ url: url, type: 'json' },
    function(data) {
      if (data.MessageType != 2) {
        callback({msg: 'Failed fetching data...'}, null);
      } else {
        callback(null, data);
      }
    }
  );
};

// Get api date components
// date: Date
// return: [YYYYMMDD, HHMM]
var getDateInApiFormat = function(date) {
  // YYYYMMDD
  var day = date.getFullYear() + 
      dateComponent(date.getMonth() + 1, 10, '0') + 
      dateComponent(date.getDate(), 10, '0');
  
  // HHMM
  var hour = dateComponent(date.getHours(), 10, '0') + 
      dateComponent(date.getMinutes(), 10, '0');
  
  return [day, hour];
};

var dateComponent = function(num, lessThen, pre) {
  return prefix(num, lessThen, pre) + num;
};

var prefix = function(num, lessThen, prefix) {
  return num < lessThen ? prefix: '';
};


// EXPORT
module.exports = {
  dateComponent: dateComponent,
  getRoutes: getRoutes,
  getStations: getStations
};