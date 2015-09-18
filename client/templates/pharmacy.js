if (Meteor.isClient) {
  var MAP_ZOOM = 14;
  Meteor.startup(function(e) {
    GoogleMaps.load();
  });
  Template.pharmacy.onCreated(function() {
    var self = this;
    GoogleMaps.ready('map', function(map) {
      var marker;
      var closestMarker;
      var closestMarker1;
      var closestMarker2;
      var closestMapMarker;
      var closestMapMarker1;
      var closestMapMarker2;
      var listMarker=[];
      var listPhano = SearchAllPhano.find({}).fetch();
       var infowindow = new google.maps.InfoWindow();
      self.autorun(function() {
        self.subscribe('searchphama');
        var latLng = Geolocation.latLng();
        if (! latLng)
        return;
        else {
          _.forEach(listPhano, function(phano) {
            newMarker = new google.maps.Marker({
              position: {
                lat: phano.LAT,
                lng: phano.LONG
              },
              content:phano.PHAMANAME
            });
            listMarker.push(newMarker);
          });
          var pi = Math.PI;
          var R = 6371; //equatorial radius
          var distances = [];
          var closest = -1;
          var closest1 = -1;
          var closest2 = -1;
          for( i=0;i<listMarker.length; i++ ) {
            var lat2 = listMarker[i].position.lat();
            var lon2 = listMarker[i].position.lng();
            var chLat = lat2-latLng.lat;
            var chLon = lon2-latLng.lng;
            var dLat = chLat*(pi/180);
            var dLon = chLon*(pi/180);
            var rLat1 = latLng.lat*(pi/180);
            var rLat2 = lat2*(pi/180);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            distances[i] = d;
            if ( closest == -1 || d < distances[closest]) {
              closest = i;
            }else if (closest1 == -1 || d < distances[closest1]) {
              closest1 = i;
            }else if (closest2 == -1 || d < distances[closest2]) {
              closest2 = i;
            }
          }
          closestMarker =listMarker[closest];
          closestMarker1 =listMarker[closest1];
          closestMarker2 =listMarker[closest2];
        }
        if(!closestMapMarker){
          closestMapMarker = new google.maps.Marker({
            position: new google.maps.LatLng(closestMarker.position.lat(), closestMarker.position.lng()),
            map: map.instance
          });
          function addInfoWindow(closestMapMarker, message) {
            var infoWindow = new google.maps.InfoWindow({
                content: message
            });
              console.log(closestMapMarker);
            google.maps.event.addListener(closestMapMarker, 'click', function () {
                infoWindow.open(map, closestMapMarker);
            });
        }
        }if(!closestMapMarker1) {
          closestMapMarker = new google.maps.Marker({
            position: new google.maps.LatLng(closestMarker1.position.lat(), closestMarker1.position.lng()),
            map: map.instance
          })  ;
        }if (!closestMapMarker2) {
          closestMapMarker = new google.maps.Marker({
            position: new google.maps.LatLng(closestMarker2.position.lat(), closestMarker2.position.lng()),
            map: map.instance
          });
        }
        // }else {
        //   closestMapMarker.setPosition(closestMarker.position);
        //   closestMapMarker.setPosition(closestMarker1.position);
        //   closestMapMarker.setPosition(closestMarker2.position);
        //   //my location
        // }
        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance,
          });
        }else {
          marker.setPosition(latLng);
        }

        map.instance.setCenter(marker.getPosition());
      });
    });
  });
  Template.pharmacy.helpers({
    mapOptions: function() {
      var marker=[];
      var latLng = Geolocation.latLng();
      GoogleMaps.ready('map', function(map) {
      });
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM,
        };
      }
    },
  });

}
