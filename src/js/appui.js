var API = require('api');

// Routes list
// data: api.getRoutes(...).Data.Routes
var getRoutesList = function (data) {
  var items = [];
  
  // Get each route
  data.forEach(function(route) {
    var item = {};
    
    var depTime = route.Train[0].DepartureTime;
    var arvTime = route.Train[0].ArrivalTime;
    
    if (route.IsExchange) {
      arvTime = route.Train[route.Train.length - 1].ArrivalTime;
      item.icon = 'images/exchange.png';
    } else {
      item.icon = 'images/direct.png';
    }
    
    // Set title and subtitle
    item.title = formatUITime(stringToDate(depTime)) + ' - ' +
        formatUITime(stringToDate(arvTime));
    item.subtitle = 'Platform ' + route.Train[0].Platform + 
      ', No. ' + route.Train[0].Trainno;
    
    item.route = route;
    
    items.push(item);
  });
  
  return items;
};


// MARK: UI Helpers

var formatUITime = function (date) {
  return API.dateComponent(date.getHours(), 10, '0') + ':' +
      API.dateComponent(date.getMinutes(), 10, '0');
};

var stringToDate = function (date) {
  var compos = date.split(' ');
  var dayCompos = compos[0].split('/');
  var hourCompos = compos[1].split(':');
  
  return new Date(dayCompos[2], parseInt(dayCompos[1]) - 1, dayCompos[0], hourCompos[0], hourCompos[1]);
};

// EXPORT
module.exports = {
  getRoutesList: getRoutesList
};