if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
  Template.pharmacy.onCreated(function() {
    var self = this;
    self.autorun(function() {
      self.subscribe('searchphama');
    });
  });
  Template.pharmacy.events({
    "change #search": function(e) {
      e.preventDefault();
      var city = $('#searchCity').val();
      Session.set('CITY', city);
      return false;
    },
    "submit #submitDis": function(e) {
      e.preventDefault();
      var district = $('#searchDistrict').val();
      Session.set('DISTRICT', district);
      return false;
    }
  });

  Template.pharmacy.helpers({
    ShowDistrict: function() {
      var city = Session.get('CITY');
      if (city == "") {
        return SearchAllPhano.find({}).fetch()
      } else {
        return SearchAllPhano.find({
          CITY: city
        }).fetch()
      }
    },
    ShowAll: function() {
      var district = Session.get('DISTRICT');
      if (district == "") {
        return SearchAllPhano.find({}).fetch()
      } else {
        return SearchAllPhano.find({
          DISTRICT: district
        }).fetch()
      }

    },
    exampleMapOptions: function() {
      var listPhano = SearchAllPhano.find({}).fetch();
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
