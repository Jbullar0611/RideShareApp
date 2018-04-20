angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $firebaseObject, Account) {
  $scope.account = {};// form data
  $scope.loginData= {};// form data in json
  $scope.initializeFirebase = function(){
    var ref = new Firebase("https://rideshareapp-201321.firebaseio.com/riders/");
    $scope.riders = $firebaseObject(ref);  
  }

  $scope.saveToSession = function(){
    $scope.loginData = {
      id : $scope.account.emailID,
      password : $scope.account.password
    }
     Account.saveToSession($scope.loginData);
  }
  $scope.findUser = function(){
    Account.findUser($scope.loginData,$scope.riders);
  }
  $scope.login = function(){
    $scope.saveToSession();
    $scope.findUser();
  };
})

.controller('RidesCtrl', function($scope, Rides) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  Rides.getAvailableRides().then(function(response) {
    $scope.rides = response;
  });
})

.controller('RideDetailCtrl', function($scope, $stateParams, Rides) {
  $scope.ride = Rides.get($stateParams.rideId);
})

.controller('AccountCtrl', function($scope) {// location settings here

  $scope.data = {};
  $scope.data.imageSource = "img/ionic.png";// Why is camera herE??? Qiang?
  $scope.takePicture = function(){
    navigator.camera.getPicture(function(imageData){
      $scope.data.imageSource = imageData;
    }, 
    function(message){
      console.log(message);
    }, 
    { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.camera });
  };
})

.controller('CreateCtrl', function($scope, $window, Account, Rides){
  $scope.ride={};
  $scope.userId;
  $scope.CreateRide = function(){
    if(Account.getSessionData())
    {
      $scope.userId = $scope.getSessionData();
      var rideJson = {
        userID : $scope.userId,
        departure : $scope.ride.departure,
        destination : $scope.ride.destination,
        time : $scope.ride.time,
        passengers : $scope.ride.passenger
      }
      Rides.CreateRide(rideJson);
    }
    else
      alert("You need to login");
  };
});