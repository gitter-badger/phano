if (Meteor.isClient) {
  var MAP_ZOOM = 15;
  Meteor.startup(function(e) {
    GoogleMaps.load();

  });
  Template.pharmacy.onCreated(function() {
    var self = this;
    GoogleMaps.ready('map', function(map) {
      var marker;
      // Create and move the marker when latLng changes.
      self.autorun(function() {
        self.subscribe('searchphama');
        var latLng = Geolocation.latLng();
        var contentString = 'Vị trí của bạn';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        if (! latLng)
        return;
        // If the marker doesn't yet exist, create it
        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            animation: google.maps.Animation.DROP,
            map: map.instance
          });
          infowindow.open(map, marker);
        }
        // The marker already exists, so we'll just change its position.
        else {
          marker.setPosition(latLng);
        }
        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });
    });
  });
  //search City
  Template.pharmacy.events({
    "change #search": function (e) {
      e.preventDefault();
      var city = $('#searchCity').val();
      Session.set('CITY',city);
      return false;
    },
    //search district
    "submit #submitDis": function (e) {
      e.preventDefault();
      var district = $('#searchDistrict').val();
      Session.set('DISTRICT',district);
      return GoogleMaps;
    }
  });

  Template.pharmacy.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var district = Session.get('DISTRICT');
      var listPhano = SearchAllPhano.find({DISTRICT:district}).fetch();
      var latLng = Geolocation.latLng();
      GoogleMaps.ready('map', function(map) {
        _.each(listPhano, function(phano) {
          var marker = new google.maps.Marker({
            position: {
              lat: phano.LAT,
              lng: phano.LONG
            },
            map: map.instance,
            title: phano.PHAMANAME,
            center: new google.maps.LatLng(),
          });

        });
      });
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }

    },
    // show Quan khi search
    ShowDistrict: function() {
      var city = Session.get('CITY');
      if (city=="") {
        return null;
      }else{
        //Ham rut gon district
        var distinctEntries = _.uniq(SearchAllPhano.find({CITY:city}, {
          sort: {DISTRICT:1}, fields: {DISTRICT: true}
        }).fetch().map(function(x) {
          return x.DISTRICT;
        }), true);
        return distinctEntries;
      }

    },
  });

}
