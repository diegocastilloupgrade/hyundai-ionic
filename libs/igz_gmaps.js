var directionsDisplay;
var directionsService;
var autocomplete;

function initGoogle(geopos) {
	if (typeof google != 'undefined') {
		initGMaps(geopos);
		initAutocomplete();
	} else {
		setTimeout(function () {
			initGoogle(geopos)
		}, 500);
	}
}

function initAutocomplete() {
	var destination_input = document.getElementById('autocomplete');

// Create the autocomplete object, restricting the search to geographical
// location types.
	autocomplete = new google.maps.places.Autocomplete(destination_input)
/** @type {!HTMLInputElement} */
//            (document.getElementById('autocomplete')), {types: ['geocode']});

// When the user selects an address from the dropdown, populate the address
// fields in the form.
	autocomplete.addListener('place_changed', fillInAddress);

//        var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
//        destination_autocomplete.bindTo('bounds', map);

}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

function fillInAddress() {
	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();
	if (place && place.geometry) {
		// expandViewportToFitPlace(place);
		GetGeoByGoogle (geopositionDest, {results: [place]}, 2)
	}
}

function expandViewportToFitPlace(place) {
	if (place.geometry.viewport) {
		map.fitBounds(place.geometry.viewport);
	} else {
		map.setCenter(place.geometry.location);
		map.setZoom(17);
	}
}


function initGMaps(geopos) {
     if (typeof google != 'undefined') {
         drawGMaps(geopos);
     } else {
         setTimeout(function () {
             initGMaps(geopos)
         }, 500);
     }
}

function drawGMaps(geopos) {
//  console.log("drawGMaps:"+geopos.latitude+","+geopos.longitude)

  // Create an array of styles.
  var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];


  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles);  //,{name: "Styled Map"}

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 12, //0-18
    center: new google.maps.LatLng(geopos.latitude,geopos.longitude),
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

//  console.log (geopos==geopositionUser)
//  if (geopos==geopositionUser) {
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "#3EC3DE" },
        suppressMarkers: true
    });
    calculateAndDisplayRoute(map, directionsService, directionsDisplay, geopos);
//  }

  /*
    var contentString = '<div id="content" style="background-color:#ff0">'+
//      '<div id="siteNotice"></div>'+
//      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent" style="background-color:#f0f">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

//    marker.addListener('click', function() {
    infowindow.open(map);
//  });
*/





}

function calculateAndDisplayRoute(map, directionsService, directionsDisplay, geoposDest) {
  var source = new google.maps.LatLng(geopositionUser.latitude, geopositionUser.longitude);
  var dest = new google.maps.LatLng(geoposDest.latitude, geoposDest.longitude);

  if (source.lat()==dest.lat() && source.lng()==dest.lng()) {
    showStationsByGeo(map, geopositionUser)
  }
  else {
      var request = {
          origin: source,
          destination: dest,
          travelMode: google.maps.TravelMode.DRIVING
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
  //      travelMode: google.maps.TravelMode  //[selectedMode]
      };
      directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {

              directionsDisplay.setDirections(response);
            /*
             directionsDisplay.setOptions({
             suppressMarkers: true,
             preserveViewport: true
             });
             */
              showStationsByRouteSteps(map, response.routes[0].legs[0].steps)
          }
          else {
              console.log('Directions request failed due to ' + status);
          }
      });
  }
}



function setMarkersByJson(map, oMarks) {
    var image = 'imgs/marker.png';

    for (var i = 0; i < oMarks.length; i++) {
      var mark = oMarks[i];
      var marker = new google.maps.Marker({
        position: {lat: mark.latitude, lng: mark.longitude},
        map: map,
        icon: image,
        title: mark.station_name +"\nAddress: "+ mark.street_address+"\nAccess time: "+mark.access_days_time+"",
      });
    }



}


/*
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.

var myMarkers = [
  ['Bondi Beach', 37.8269775, -122.4229555, 4],
  ['Coogee Beach', 37.8269785, -122.4229565, 5],
  ['Cronulla Beach', 37.8269875, -122.4229655, 3],
  ['Manly Beach', 37.8380775, -122.4100555, 2],
  ['Maroubra Beach', 37.8369775, -122.4239555, 1]
];

function setMarkersByArray(map, markers) {
  var image = 'img/marker.png';

  for (var i = 0; i < markers.length; i++) {
    var mark = markers[i];
    var marker = new google.maps.Marker({
      position: {lat: mark[1], lng: mark[2]},
      map: map,
      icon: image,
      title: mark[0],
    });
  }
}
*/
