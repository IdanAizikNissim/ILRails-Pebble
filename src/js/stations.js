var API = require('api');
var Storage = require('storage');

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
    if (parseInt(stations[i].Id) === id) {
      name = stations[i][lang][0];
      break;
    }
  }
  
  return name;
};

// EXPORT
module.exports = {
  fetchStations: fetchStations,
  getStationNameById: getStationNameById,
  stations: stations
};