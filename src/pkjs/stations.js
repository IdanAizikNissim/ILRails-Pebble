var API = require('./api');
var Storage = require('./storage');

var stations;

var fetchStations = function (callback) {
  stations = Storage.get(Storage.keys.STATIONS);
  
  API.getStations(function (err, data) {
    if (err) {
      callback(err, stations);
    } else {
      // Store stations if changed
      if (!stations || stations.length !== data.Data.CustomPropertys.length) {
        Storage.put(Storage.keys.STATIONS, data.Data.CustomPropertys);
        stations = data.Data.CustomPropertys;
      }
      
      callback(null, stations);
    }
  });
};

var getStationNameById = function (id, lang) {
  var name;
  for (var i = 0; i < stations.length; ++i) {
    if (parseInt(stations[i].Id) === parseInt(id)) {
      name = stations[i][lang][0];
      break;
    }
  }
  
  return name;
};

var addToFav = function (id) {
  Storage.append(Storage.keys.FAV_STATIONS, id);
};

var removeFromFav = function (id) {
  Storage.truncate(Storage.keys.FAV_STATIONS, id);
};

var inFav = function (id) {
  return Storage.contains(Storage.keys.FAV_STATIONS, id);
};

var toggleFav = function(id) {
  var fav = inFav(id);
  if (fav) { removeFromFav(id); } else { addToFav(id); }

  return !fav;
};

var getFavStations = function(lang) {
  var stations = [];
  var sts = Storage.get(Storage.keys.FAV_STATIONS);
  
  sts.forEach(function(s) {
    stations.push({
      id: s,
      name: getStationNameById(s, lang)
    });
  });
  
  return stations;
};

var getStations = function() {
  return stations;
};

var addRoute = function(oId, tId) {
  Storage.append(Storage.keys.ROUTES, oId + "," + tId);
};

var removeRoute = function(oId, tId) {
  Storage.truncate(Storage.keys.ROUTES, oId + "," + tId);
};

var getRoutes = function(lang) {
  var routes = [];
  
  var rs = Storage.get(Storage.keys.ROUTES);
  
  if (rs) {
    rs.forEach(function(r) {
      var otIds = r.split(',');
      var route = {
        oId: otIds[0],
        tId: otIds[1],
        oName: getStationNameById(otIds[0], lang),
        tName: getStationNameById(otIds[1], lang)
      };
      
      routes.push(route);
    });
  }
  
  return routes;
};

// EXPORT
module.exports = {
  fetchStations: fetchStations,
  getStationNameById: getStationNameById,
  getStations: getStations,
  addToFav: addToFav,
  inFav: inFav,
  removeFromFav: removeFromFav,
  toggleFav: toggleFav,
  addRoute: addRoute,
  removeRoute: removeRoute,
  getRoutes: getRoutes,
  getFavStations: getFavStations
};