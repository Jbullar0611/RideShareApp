angular.module('starter.services', [])
  .factory('Account', function ($scope, $http, $window) {
    return {
      saveToSession: function (accountJson) {
        if ($window.sessionStorage.getItem(accountJson.id)) { // for checking throughout the app
          //$window.sessionStorage.removeItem(accountJson.id);
          alert("User Already Exist");
        }
        else {
          $window.sessionStorage.setItem
            (accountJson.id, JSON.stringify(accountJson));
            $scope.id = accountJson.id;
        }
      },
      getSessionData : function (){// used to retrieve session variable for other controllers
       return $window.sessionStorage.getItem($scope.id);// will this $scope.id work???
      },
      findUser : function(accountData, oRiders){
        $scope.data;
        foreach( $scope.data in oRiders);// Needs an iterative logic through firebase
      }
    }
  })
  .factory('Rides', function ($http, $httpParamSerializer) {
    // Might use a resource here that returns a JSON array
    return {
      getAvailableRides: function () {
        return $http.get('http://52.15.77.158:8081/rideshares/searchAvailableRide')
          .then(function (response) {
            return response.data;
          });
      },
      CreateRide: function (rideJson) {
          return $http.post('http://52.15.77.158:8081/rideshares/searchAvailableRide', $httpParamSerializer(rideJson))// Will this work??
          .success(function(response){
            return response.data;
          })
        }
    };
  });