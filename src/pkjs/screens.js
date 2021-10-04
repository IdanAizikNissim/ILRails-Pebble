var UI = require('pebblejs/ui');
var API = require('./api');
var APPUI = require('./appui');
var Stations = require('./stations');
var Lang = require('./language');

var openRouteDetailsScreen = function(route) {
  new UI.Menu({ sections: APPUI.routeDetailsList(route, Lang.getDefLang()) }).show();
};

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
        if (e.sectionIndex === 0) {
          // Change time
        } else {
          // Show route detail
          openRouteDetailsScreen(e.item.route);
        }
      });
    
      menu.show(); 
    }
  });
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

var favStationScreen = function(callback) {
  var lang = Lang.getDefLang();
  var menu = openMenuScreen(APPUI.getFavStationsList(lang));
  menu.on('select', function(e) {
    callback(e.item.id);
    menu.hide();
  });
};

var addRouteScreen = function(edit, data, callback) {
  var lang = Lang.getDefLang();
  
  var items = [
    {
      title: Lang.word('origin'),
      subtitle: Lang.word('select_org_station')
    },
    {
      title: Lang.word('destination'),
      subtitle: Lang.word('select_dest_station')
    },
    {
      title: Lang.word('save')
    }
  ];
  
  var route = {};
  
  if (edit) {
    items.push({title: Lang.word('delete')});
    route.oId = data.oId;
    route.tId = data.tId;
    items[0].subtitle = data.oName;
    items[1].subtitle = data.tName;
  }
  
  var menu = openMenuScreen(items);
  
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
    } else if (e.itemIndex === 2) {
      // Save
      if (route.oId && route.tId && route.oId != route.tId) {
        if (edit) {
          Stations.removeRoute(data.oId, data.tId);
        }
        
        Stations.addRoute(route.oId, route.tId);
        callback();
        menu.hide();
      }
    } else {
      // Delete
      Stations.removeRoute(data.oId, data.tId);
      callback();
      menu.hide();
    }
  });
};

var manageRoutesScreen = function() {
  var menu = new UI.Menu({ sections: [
    {items: [{
      title: Lang.word('add_route')
    }]},
    {items: APPUI.getSavedRoutesList(Lang.getDefLang())}
  ] });
  
  menu.on('select', function(e) {
    if (e.sectionIndex === 0) {
      // Add route
      addRouteScreen(false, null, function() {
        menu.hide();
        menu.show();
      });
    } else {
      // Open routes
      openRoutesScreen(e.item.oId, e.item.tId, new Date());
    }
    
    menu.on('longSelect', function(e) {
      if (e.sectionIndex === 1) {
        addRouteScreen(true, {oId: e.item.oId, tId: e.item.tId, oName: e.item.subtitle, tName: e.item.title}, function() {
          menu.hide();
          menu.show();
        });
      }
    });
  });
  
  menu.show();
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
      title: Lang.word('routes'),
      icon: 'images/route.png'
    },
    {
      title: Lang.word('stations'),
      icon: 'images/train.png'
    },
    {
      title: Lang.word('language'),
      subtitle: Lang.word('select_def_lang'),
      icon: 'images/lang.png'
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