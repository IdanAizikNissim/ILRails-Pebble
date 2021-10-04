Pebble.addEventListener("ready", function () {
  require("pebblejs");
  var Screens = require("./screens");
  var Stations = require("./stations");

  Stations.fetchStations(function (err, stations) {
    if (err) {
    }

    if (!stations) {
    } else {
      Screens.openDownMenuScreen();
    }
  });
});
