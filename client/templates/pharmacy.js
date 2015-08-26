if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
Template.pharmacy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('searchphama');
  });
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});
Template.pharmacy.helpers({
    ShowAll: function() {
      return SearchAllPhano.find({});
    },
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(10.776077000,106.680528000),
          
          zoom: 12
        };
      }
    }
});
}
