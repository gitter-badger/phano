if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
<<<<<<< HEAD
  Template.pharmacy.onCreated(function() {
    var self = this;
    self.autorun(function() {
      self.subscribe('searchphama');
    });
  });
  Template.pharmacy.events({
    "change #search": function (e) {
        e.preventDefault();
      var city = $('#searchCity').val();
      Session.set('CITY',city);
      return false;
    },
    "submit #submitDis": function (e) {
      e.preventDefault();
      var district = $('#searchDistrict').val();
      Session.set('DISTRICT',district);
      return false;
    }
  });

  Template.pharmacy.helpers({
    ShowDistrict: function() {
      var city = Session.get('CITY');
      if (city=="") {
        return SearchAllPhano.find({}).fetch()
      }else{
        return SearchAllPhano.find({CITY:city}).fetch()
      }
    },
=======

  Template.pharmacy.helpers({
>>>>>>> 3bc30ad48e2d3dc1bc3d11cd6f32a2a6eac25427
    ShowAll: function() {
      var district = Session.get('DISTRICT');
      if (district=="") {
         return SearchAllPhano.find({}).fetch()
       }else{
        return SearchAllPhano.find({DISTRICT:district}).fetch()
       }

    },
    exampleMapOptions: function() {
<<<<<<< HEAD
      var listPhano = SearchAllPhano.find({}).fetch();
=======
      debugger;
      var listPhano = SearchAllPhano.find().fetch();
      console.log(listPhano);
>>>>>>> 3bc30ad48e2d3dc1bc3d11cd6f32a2a6eac25427
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
<<<<<<< HEAD
          center: new google.maps.LatLng(10.776077000,106.680528000),
=======
          center: new google.maps.LatLng(10.776077000, 106.680528000),

>>>>>>> 3bc30ad48e2d3dc1bc3d11cd6f32a2a6eac25427
          zoom: 12
        };
      }
    }
  });
}
