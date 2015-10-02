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
                lng: phano.LONG,
              },
              Content:{
                name: phano.PHAMANAME,
                add:phano.ADDRESS,
                city: phano.CITY,
                tel:phano.PHONE
              },
              icon:'./icon/image10.png',
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
        /////////////////////////////////////////////////////////////////////////////////////////marker 1
        if(!closestMapMarker){
          closestMapMarker = new google.maps.Marker({
            position: new google.maps.LatLng(closestMarker.position.lat(), closestMarker.position.lng()),
            map: map.instance,
            icon:'./icon/image10.png',
          });
        }
        var infowindow = new google.maps.InfoWindow({
          content:
          "<b>"+closestMarker.Content.name +"</b>"+"<br/>"+
          "Địa Chỉ: "+closestMarker.Content.add + closestMarker.Content.city+"<br/>"+
          "TEL: "+ closestMarker.Content.tel
        });
        google.maps.event.addListener(closestMapMarker, 'click', function() {
          map.instance.setCenter(closestMapMarker.getPosition());
          infowindow.open(map.instance, closestMapMarker);
        });

        /////////////////////////////////////////////////////////////////////////////////////////marker 2
        if(!closestMapMarker1) {
          closestMapMarker1 = new google.maps.Marker({
            position: new google.maps.LatLng(closestMarker1.position.lat(), closestMarker1.position.lng()),
            map: map.instance,
            icon: './icon/image10.png',
          });
        }
        var infowindow1 = new google.maps.InfoWindow({
          content:
          "<b>"+closestMarker1.Content.name +"</b>"+"<br/>"+
          "Địa Chỉ: "+closestMarker1.Content.add + closestMarker1.Content.city+"<br/>"+
          "TEL: "+ closestMarker1.Content.tel
        });
        google.maps.event.addListener(closestMapMarker1, 'click', function() {
          map.instance.setCenter(closestMapMarker1.getPosition());
          infowindow1.open(map.instance, closestMapMarker1);
        });

        /////////////////////////////////////////////////////////////////////////////////////////marker 3
        if (!closestMapMarker2) {
          closestMapMarker2 = new google.maps.Marker({
            position: new google.maps.LatLng(closestMarker2.position.lat(), closestMarker2.position.lng()),
            map: map.instance,
            icon:'./icon/image10.png',
          });
        }   var infowindow2 = new google.maps.InfoWindow({
          content:
          "<b>"+closestMarker2.Content.name +"</b>"+"<br/>"+
          "Địa Chỉ: "+closestMarker2.Content.add + closestMarker2.Content.city+"<br/>"+
          "TEL: "+ closestMarker2.Content.tel
        });
        google.maps.event.addListener(closestMapMarker2, 'click', function() {
          map.instance.setCenter(closestMapMarker2.getPosition());
          infowindow2.open(map.instance, closestMapMarker2);
        });


        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance,
            icon: './icon/image10.png',
          });
        }else {
          marker.setPosition(latLng);
        }
        map.instance.setZoom(MAP_ZOOM);
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
