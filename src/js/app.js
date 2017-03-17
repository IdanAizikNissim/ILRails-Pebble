var UI = require('ui');
var Screens = require('screens');
var Stations = require('stations');

var init = function () {
  Stations.fetchStations(function (err, stations) {
    if (err) {
      
    }
    
    if (!stations) {
      
    } else {
      var main = Screens.mainScreen();
      main.show();
      
      // Main screen on up
      main.on('click', 'up', function(e) {
        var oId = 3600;
        var tId = 9800;
        var date = new Date("March 24, 2017 13:00:00");
        Screens.openRoutesScreen(oId, tId, date);
      });
      
      // Main screen on select
      main.on('click', 'select', function(e) {
      
      });
      
      // Main screen on down
      main.on('click', 'down', function(e) {
        var card = new UI.Card();
        card.title('A Card');
        card.subtitle('Is a Window');
        card.body('The simplest window type in Pebble.js.');
        card.show();
      });
      
    }
  });
};

init();