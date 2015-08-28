if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.pharmacy.helpers({
    ShowAll: function() {
      return SearchAllPhano.find({});
    },
    exampleMapOptions: function() {
      debugger;
      var listPhano = SearchAllPhano.find().fetch();
      console.log(listPhano);
      GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        _.each(listPhano, function(phano) {
          var marker = new google.maps.Marker({
            position: {
              lat: phano.LAT,
              lng: phano.LONG
            },
            map: map.instance
          });
        });
      });
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(10.776077000, 106.680528000),

          zoom: 12
        };
      }
    }
  });
}
