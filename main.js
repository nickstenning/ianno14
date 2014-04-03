var Annotator = require('annotator');
var DebugStore = require('annotator/lib/plugin/debugstore');

Annotator.Plugin.Location = (function() {

  function Location(element, options) {
    this.element = element;
    this.options = options;
    console.log("Location plugin constructed");
  }

  Location.prototype.pluginInit = function() {
    var self = this;
    console.log("Location plugin initialized");

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

  Location.prototype.destroy = function() {};

  return Location;
})();


$ = Annotator.Util.$;

$(function () {

  var ann = new Annotator(document.body, {
    store: {type: DebugStore}
  });
  ann.addPlugin('Location');

  window.ann = ann;

}());

exports.Annotator = Annotator;
