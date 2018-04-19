angular.module('starter.services', [])

.factory('Rides', function($http) {
  // Might use a resource here that returns a JSON array
  return {
    getAvailableRides: function() {
      return $http.get('http://52.15.77.158:8081/rideshares/searchAvailableRide')
       .then(function (response) {
       return response.data;
      });
    },
    Create: function(){

    } 
  };
});