angular.module('starter.services', [])
  .factory('Account', function ( $http, $window) {
    return {
      saveToSession: function (accountJson) {
        if ($window.sessionStorage.getItem('userData')) { // for checking throughout the app
          //$window.sessionStorage.removeItem(accountJson.id);
          alert("User Already Exist");
        }
        else {
          var id = accountJson.emailID;
          $window.sessionStorage.setItem
            ('userData', id);
        }
      },
      getSessionData : function (){// used to retrieve session variable for other controllers
        console.log('userData'+$window.sessionStorage.getItem('userData'));
        return $window.sessionStorage.getItem('userData');// will this $scope.id work???
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
      CreateRide: function (rideJson) {
          return $http.post('http://52.15.77.158:8081/rideshares/', rideJson)// Will this work??
          .success(function(response){
            return response.data;
          })
        },
        BookRide: function(rideJson) {// need just RideID and UserId
          return $http.post('http://52.15.77.158:8081/rideshares/bookRide/', rideJson)
          .success(function (response){
            return response.data;
          })
        },
        RemoveRide: function(rideID){//needs just RideID
          return $http.delete('http://52.15.77.158:8081/rideshares/', rideID)
          .success(function (response){
            return response.data;
          })
        }
    };
  });