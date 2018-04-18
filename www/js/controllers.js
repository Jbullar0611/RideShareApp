angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.isLoggedIn;
  $scope.account = {};
  $scope.login = function(){
    
  }
  
})

.controller('RidesCtrl', function($scope, Rides) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.rides = Rides.all();
  $scope.remove = function(ride) {
    Rides.remove(ride);
  };
})

.controller('RideDetailCtrl', function($scope, $stateParams, Rides) {
  $scope.ride = Rides.get($stateParams.rideId);
})

.controller('AccountCtrl', function($scope) {// location settings here
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CreateCtrl', function($scope){
  $scope.data = {};
  $scope.data.imageSource = "img/ionic.png" ;
  $scope.settings = {
    enableFriends: false
  }
  $scope.CreateRide = function(){

  }
  $scope.takePicture = function(){
    alert("Taking photo");
    navigator.camera.getPicture(function(imageData){
      alert(imageData);
      $scope.data.imageSource = imageData.imageSource;
    }, 
    function(message){
      console.log(message);
    }, 
    { quality: 50 });
  }
});
