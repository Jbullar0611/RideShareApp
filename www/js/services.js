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
    Create: function(userId, departure, destination, time, passengers){
      return $http({method:'POST',url:'http://52.15.77.158:8081/rideshares?userId=' + userId + "&departure=" + departure 
        + "&destination=" + destination + "&time=" + time + "&passengers=" + passengers})
      .then(function(response){
          return response.data;
        });
    },
    book: function(id, userId) {
      return $http({method:'POST',url:'http://52.15.77.158:8081/rideshares/bookRide?id=' + id + "&userId=" + userId})
      .then(function(response){
        return response;
      });
    },
    delete: function(id){
      return $http({method:'DELETE', url:'http://52.15.77.158:8081/rideshares?id=' + id});
    }
  };
})
.factory('User',function($http,$rootScope){ 
   
  return {
    signup:function(data){
      $rootScope.users[data.token] = {email:data.email,password:data.password};
      $rootScope.users.$save();
    },
    login:function(data){
      if($rootScope.users.hasOwnProperty(data.token)){
        if($rootScope.users[data.token]!=null){
          return true;
        }
      }
    },
    logout:function(){
      $rootScope.isLoggedIn = false;
    }
  }
});