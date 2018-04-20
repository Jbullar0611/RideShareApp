angular.module('starter.services', [])
  .factory('Account', function ($http, $window) {
    return {
      saveToSession: function (accountJson) {
        if ($window.sessionStorage.getItem(accountJson.id)) { // for checking throughout the app
          //$window.sessionStorage.removeItem(accountJson.id);
          alert("User Already Exist");
        }
        else {
          $window.sessionStorage.setItem
            (accountJson.id, JSON.stringify(accountJson));
        }
      },
      findUser : function(){

      }
    }
  })
  .factory('Rides', function ($http) {
    // Might use a resource here that returns a JSON array
    return {
      getAvailableRides: function () {
        return $http.get('http://52.15.77.158:8081/rideshares/searchAvailableRide')
          .then(function (response) {
            return response.data;
          });
      },
      Create: function () {

      }
    };
  });