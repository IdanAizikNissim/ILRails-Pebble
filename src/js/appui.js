var API = require('api');
var Stations = require('stations');
var Lang = require('language');

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
    item.subtitle = Lang.word('platform') + ' ' + route.Train[0].Platform + 
      ', ' + Lang.word('num') + ' ' + route.Train[0].Trainno;
    
    item.route = route;
    
    items.push(item);
  });
  
  return items;
};

var routeDetailsList = function (route, lang) {
    var section = [];
    route.Train.forEach(function(train) {
      section.push({
        items: [{
          title: Stations.getStationNameById(train.DestinationStation, lang),
          subtitle: Stations.getStationNameById(train.OrignStation, lang),
          icon: 'images/train.png'
        }]
      });
      
      var items = [];
      train.StopStations.forEach(function(stop) {
        items.push({
          title: Stations.getStationNameById(stop.StationId, lang),
          subtitle: formatUITime(stringToDate(stop.ArrivalTime)) + ', ' + Lang.word('platform') + ' ' + stop.Platform
        });
      });
      
      section.push({items: items});
    });
  
  return section;
};

var getStationsList = function (stations, lang) {
  var items = [];
  
  stations.forEach(function(station) {
    items.push({
      title: station[lang][0],
      icon: "images/" + (!Stations.inFav(station.Id) ? "star_empty.png" : "star_full.png"),
      station: station.Id
    });
  });
  
  return items;
};

var getSavedRoutesList = function(lang) {
  var items = [];
  
  Stations.getRoutes(lang).forEach(function(route) {
    items.push({
      title: route.tName,
      subtitle: route.oName,
      oId: route.oId,
      tId: route.tId
    });
  });
  
  return items;
};

var getFavStationsList = function(lang) {
  var items = [];
  
  Stations.getFavStations(lang).forEach(function(station) {
    items.push({
      title: station.name,
      id: station.id,
    });
  });
  
  return items;
};

var getLangsList = function() {
  var items = [];
  var langs = Lang.getLangs();
  
  for (var key in langs) {
    var lang = langs[key];
    var item = {
      title: lang.english,
      subtitle: lang.name,
      acronym: lang.acronym
    };
    
    if (Lang.isDefLang(lang.acronym)) {
      item.icon = 'images/tick.png';
    }
    
    items.push(item); 
  }
  
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
  getRoutesList: getRoutesList,
  getStationsList: getStationsList,
  getLangsList: getLangsList,
  getSavedRoutesList: getSavedRoutesList,
  getFavStationsList: getFavStationsList,
  routeDetailsList: routeDetailsList
};