var Screens = require('screens');
var Stations = require('stations');

var init = function () {
  Stations.fetchStations(function (err, stations) {
    if (err) {
      
    }
    
    if (!stations) {
      
    } else {
      Screens.openDownMenuScreen();
    }
  });
};

init();