// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


window.onload = function(){
    // loadComments();
    // getDropdownVal();
    initMap();
    // console.log("I see you are looking at the console")
}

// function addRandomGreeting() {
//   const facts =
//       ['I have a tabby cat named Poppy.', 'I was in a drumline.', 'I\'m part of Y Fashion House at Yale.', 'I love to paint.', 'I am from Nashville.'];

//   // Pick a random greeting.
//   const fact = facts[Math.floor(Math.random() * facts.length)];

//   // Add it to the page.
//   const factContainer = document.getElementById('message-container');

//   factContainer.innerText = "You found a hidden fact! \n \n" + fact;
// }

// onload function 
function loadComments() {
  fetch('/list-comments').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
      commentListElement.appendChild(createCommentElement(comment));
    })
  });
}

// 6/15 Google Sign in and out
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Warning from guide: Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); 
}
// 6/15 works 
// @self comeback later to implement this in the comment form

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

// Creates an element that represents a comment, including its delete button. 
function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.title;

  const userElement = document.createElement('span');
  userElement.innerText = comment.user;

  const timeElement = document.createElement('span');
  timeElement.innerText = comment.time;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteComment(comment);

    // Remove the comment from the DOM.
    commentElement.remove();
  });

  commentElement.appendChild(titleElement);
  commentElement.appendChild(userElement);
  commentElement.appendChild(timeElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}


// Tells the server to delete the comment. 
function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
 fetch('/delete-comment', {method: 'POST', body: params});
}

// 6/10 trying to match the display value with selection 
function getDropdownVal() {
    const dropdown = document.getElementById("commentsShown");
    dropdown.onchange = changeDropdownVal;
    if (localStorage["commentsShown"]) {
        dropdown.value = localStorage["commentsShown"];
    }   
}

function changeDropdownVal() {
    const dropdown = document.getElementById("commentsShown");
    localStorage["commentsShown"] = dropdown.value;
    this.form.submit();
}


// Create greyscale map with a marker 
function initMap() {
    console.log("init map");
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