var UI = require('ui');
var API = require('api');
var APPUI = require('appui');
var Stations = require('stations');

var openRoutesScreen = function(oId, tId, date) {
  API.getRoutes(oId, tId, date, function (err, data) {
    if (err) {
      
    } else {
      var menu = new UI.Menu({ sections: [
        {items: [{
          title: Stations.getStationNameById(tId, 'Heb'),
          subtitle: Stations.getStationNameById(oId, 'Heb'),
          icon: 'images/train.png'
        }]},
        {items: APPUI.getRoutesList(data.Data.Routes)}
      ] });
    
      menu.on('select', function(e) {
        //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log(e.item.route);
      });
    
      menu.show(); 
    }
  });
};

var mainScreen = function() {
  var main = new UI.Card({
    title: 'Pebble.js',
    icon: 'images/menu_icon.png',
    subtitle: 'Hello World!',
    body: 'Press any button.',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
  });
  
  return main;
};

// EXPORT
module.exports = {
  openRoutesScreen: openRoutesScreen,
  mainScreen: mainScreen
};