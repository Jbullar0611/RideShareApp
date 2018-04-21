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