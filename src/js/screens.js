var UI = require('ui');
var API = require('api');
var APPUI = require('appui');
var Stations = require('stations');
var Lang = require('language');

var openRoutesScreen = function(oId, tId, date) {
  API.getRoutes(oId, tId, date, function (err, data) {
    if (err) {
      
    } else {
      var lang = Lang.getDefLang();
      var menu = new UI.Menu({ sections: [
        {items: [{
          title: Stations.getStationNameById(tId, lang),
          subtitle: Stations.getStationNameById(oId, lang),
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

var favStationScreen = function(callback) {
  var lang = Lang.getDefLang();
  var menu = openMenuScreen(APPUI.getFavStationsList(lang));
  menu.on('select', function(e) {
    callback(e.item.id);
    menu.hide();
  });
};

var addRouteScreen = function(callback) {
  var lang = Lang.getDefLang();
  var menu = openMenuScreen([
    {
      title: 'Origin',
      subtitle: 'select origin station'
    },
    {
      title: 'Destination',
      subtitle: 'select destination station'
    },
    {
      title: 'Save'
    }
  ]);
  
  var route = {};
  menu.on('select', function(e) {
    if (e.itemIndex === 0) {
      // Origin
      favStationScreen(function (id) {
        route.oId = id;
        e.item.subtitle = Stations.getStationNameById(id, lang);
      });
    } else if (e.itemIndex === 1) {
      // Dest.
      favStationScreen(function (id) { 
        route.tId = id;
        e.item.subtitle = Stations.getStationNameById(id, lang);
      });
    } else {
      // Save
      if (route.oId && route.tId) {
        Stations.addRoute(route.oId, route.tId);
        callback();
        menu.hide();
      }
    }
  });
};

var manageRoutesScreen = function() {
  var menu = new UI.Menu({ sections: [
    {items: [{
      title: 'Add Route'
    }]},
    {items: APPUI.getSavedRoutesList(Lang.getDefLang())}
  ] });
  
  menu.on('select', function(e) {
    if (e.sectionIndex === 0) {
      // Add route
      addRouteScreen(function() {
        menu.hide();
        menu.show();
      });
    } else {
      // Open routes
      openRoutesScreen(e.item.oId, e.item.tId, new Date());
    }
  });
  
  menu.show();
};

var openMenuScreen = function(items) {
  var menu = new UI.Menu({ 
    sections: [{
      items: items
    }]
  });
  
  menu.show(); 
  
  return menu;
};

var openStationsScreen = function() {
  var menu = openMenuScreen(APPUI.getStationsList(Stations.getStations(), Lang.getDefLang()));
  
  menu.on('select', function(e) {
    var f = Stations.toggleFav(e.item.station);
    e.item.icon = "images/" + (!f ? "star_empty.png" : "star_full.png");
    menu.hide();
    menu.show();
  });
};

var openLangsScreen = function() {
  var menu = openMenuScreen(APPUI.getLangsList());
  menu.on('select', function(e) {
    Lang.changeDefLang(e.item.acronym);
    e.item.icon = "images/tick.png";
    menu.hide();
    menu.show();
  });
};

var openDownMenuScreen = function() {
  var menu = openMenuScreen([
    {
      title: 'Routes'
    },
    {
      title: 'Stations'
    },
    {
      title: 'Language',
      subtitle: 'select default language'
    }
  ]);
  
  menu.on('select', function(e) {
    if (e.itemIndex === 0) {
      manageRoutesScreen();
    } else if (e.itemIndex === 1) {
      openStationsScreen();
    } else if (e.itemIndex === 2) {
      openLangsScreen();
    }
  });
};

// EXPORT
module.exports = {
  openRoutesScreen: openRoutesScreen,
  openStationsScreen: openStationsScreen,
  openLangsScreen: openLangsScreen,
  openDownMenuScreen: openDownMenuScreen,
  manageRoutesScreen: manageRoutesScreen
};