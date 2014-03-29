var Annotator = require('annotator/lib/annotator');

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

    this.annotator.on('annotationCreated', function (annotation) {
      console.log("Created annotation:", annotation);
    });
  };

  Location.prototype.destroy = function() {};

  return Location;
})();


$ = Annotator.Util.$;

$(function () {

  var ann = new Annotator(document.body);
  ann.addPlugin('Location');

}());

exports.Annotator = Annotator;
