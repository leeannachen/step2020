// Create greyscale map with a marker 
function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
    [{
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
        "elementType": "labels",
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
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "lightness": 60
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
        "elementType": "labels",
        "stylers": [
        {
            "visibility": "off"
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
        "elementType": "labels.text.fill",
        "stylers": [
        {
            "color": "#9e9e9e"
        }
        ]
    }
    ],
            {name: 'Styled Map'});

    // The location of Nashville
    var nashville = {lat: 36.164347196601156, lng: -86.78117037227406};

    // 6/11 bug
    const map_div=document.getElementById('map');

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var map = new google.maps.Map(map_div, {
        center: {lat: 38, lng: -88},
        zoom: 4,
        mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
        }
    });

    // Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // Create landmark
    addLandmark(
        map, nashville.lat, nashville.lng, 'Nashville',
        'I grew up in Nashville, TN.')
    addLandmark(
        map, 35.0887, -92.4421, 'Conway',
        'I was born in Conway, AR.')
    addLandmark(
        map, 41.3163, -72.9223, 'Yale',
        'I attend Yale University.')
    addLandmark(
        map, 40.0189, -105.2741, 'Google Boulder',
        'I am a STEP intern at the Google Boulder office.')   
    addLandmark(
        map, 42.373611, -71.110558, 'Google Cambridge',
        'I attended Google CSSI at the Cambridge office in 2019.') 

}

// Adds marker that dows an info winderow when clicked 
function addLandmark(map, lat, lng, title, description) {
    const marker = new google.maps.Marker(
    {position: {lat: lat, lng: lng}, map: map, title: title});

    const infoWindow = new google.maps.InfoWindow({content: description});
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}