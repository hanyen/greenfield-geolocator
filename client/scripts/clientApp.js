
var hanyenPosition = {
  lat: 37.7836, 
  lng: -122.409
};

//need to set the zoom value so that all users are visible
//remove map/statelite, zoom, and the streetview buttons


function initMap() {
  window.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7836786, lng: -122.409105},
    zoom: 18
  });
  window.infoWindow1 = new google.maps.InfoWindow({map: map}); 
  window.infoWindow2 = new google.maps.InfoWindow({map: map}); 
}

// Try HTML5 geolocation.
var success = function(position) {
  console.log('position from watchPosition: ', position.coords);
  window.pos = {
    'lat': position.coords.latitude,
    'lng': position.coords.longitude
  };
  //console.log('HELLO!', JSON.stringify(pos), window.pos);
  infoWindow1.setPosition(pos);
  infoWindow1.setContent('Dan');
  infoWindow2.setPosition(hanyenPosition);
  infoWindow2.setContent('Hanyen');
  map.setCenter(pos);
}
var error = function(position) {
  console.log('error from watchPosition: ', position);
}
var options = {
  enableHighAccuracy: true,
  timeout: 1,
  maximumAge: Infinity
};
navigator.geolocation.watchPosition(success, error, options);
setInterval(function(){ 
  hanyenPosition.lat += 0.0001
  hanyenPosition.lng += 0.0001
  infoWindow2.setPosition(hanyenPosition);
}, 1000);


var palFinder = angular.module('palFinder', ['ngRoute']);

palFinder.config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider
  .when('/', {
      templateUrl: '../partials/pinButtons.html',
      controller: 'palFinderCtrl',
    })
    .when('/logout', {
      templateUrl: '../partials/logout.html',
      controller: 'palFinderCtrl'
    })
    .when('/myaccount', {
      templateUrl: '../partials/myAccount.html',
      controller: 'palFinderCtrl'
    })
    .when('/signup', {
      templateUrl: '../partials/signup.html',
      controller: 'palFinderCtrl'
    })
    .otherwise({redirectTo: '/'})
});

palFinder.controller('palFinderCtrl', ['$scope', '$window', '$http', function($scope, $window, $http) {

  var repeatedlySendLocationData = function () {
    $http({
      method: 'POST',
      url: 'https://127.0.0.1:8001/', //change this to local or deployed IP
      data: {
        'lat': $window.pos.lat,
        'lng': $window.pos.lng
      }
    }).then(function successCallback(response) {
        console.log('success response', response);
      }, function errorCallback(response) {
        console.log('error response', response);
      });  
    }

    setInterval(function(){
      if ($window.pos.lat) {
        repeatedlySendLocationData();
      }
    }, 3000);

    $scope.messageButtonClick = function() {
      console.log('Message button is clicked');
    };

}]);
