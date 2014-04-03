var Annotator = require('annotator');
var DebugStore = require('annotator/lib/plugin/debugstore');

$ = Annotator.Util.$;

Annotator.Plugin.Location = (function() {

  function Location() {}

  Location.prototype.pluginInit = function() {
    var self = this;

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Got your coordinates!");
      self.coords = position.coords;
    });

    this.annotator.on('beforeAnnotationCreated', function (annotation) {
      if (self.coords != null) {
        annotation.coords = {};
        annotation.coords.latitude = self.coords.latitude;
        annotation.coords.longitude = self.coords.longitude;
        annotation.coords.accuracy = self.coords.accuracy;
      }
    });
  };

  return Location;
})();

$(function () {

  var ann = new Annotator(document.body, {
    store: {type: DebugStore}
  });
  ann.addPlugin('Location');

}());
