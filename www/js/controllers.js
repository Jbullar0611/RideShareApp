angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window, $document,User,$rootScope,$state) {
  $scope.signupData = {};
  $scope.loginData = {};

  //Use this variable to check if user is logged in or not
  $rootScope.isLoggedIn = false;

  //This logic is for the toggling of login and signup form
  $scope.toggleAccount = 'Signup';
  $scope.toggleAccountForm = function(){
    if($scope.toggleAccount=='Signup'){
      $scope.toggleAccount = 'Login';
    }else{
      $scope.toggleAccount = 'Signup';
    }
  }

  $scope.signup = function(){
    User.signup({token:CryptoJS.MD5($scope.signupData.email+$scope.signupData.password+'secretsecretessecrets'),email:$scope.signupData.email,password:$scope.signupData.password});
    $rootScope.isLoggedIn = true;
    $state.go('tab.rides');
  }

  $scope.login = function(){
    if(User.login({token:CryptoJS.MD5($scope.loginData.email+$scope.loginData.password+'secretsecretessecrets')})){
      $rootScope.isLoggedIn = true;
      $rootScope.email = $scope.loginData.email;
      $state.go('tab.rides');
    }else{
      $rootScope.isLoggedIn = false;
      $scope.toggleAccountForm();
    }
  }
})

.controller('RidesCtrl', function($scope, Rides, $rootScope) {
  // With
  $scope.$on('$ionicView.enter', function(e) {
    Rides.getAvailableRides().then(function(response) {
      $scope.rides = response;
    });

    $scope.book = function(id){
      Rides.book(id, $rootScope.email);
      Rides.getAvailableRides().then(function(response) {
        $scope.rides = response;
      });
    };

    $scope.delete = function(id) {
      Rides.delete(id);
      Rides.getAvailableRides().then(function(response) {
        $scope.rides = response;
      });
    }
  });

  //You can check either here or on front end if user is logged in or not and on the basis of that do any logic or show any UI
  //To simplify just inject $rootScope and use variable isLoggedIn to check the user status
  //Call logout to logout the user and set the variable to false
  
})


.controller('RideDetailCtrl', function($scope, $stateParams, Rides) {
  //$scope.ride = Rides.get($stateParams.rideId);
})


.controller('AccountCtrl', function($scope) {// location settings here
  $scope.settings = {
    enableFriends: true
  };

  $scope.data = {};
  $scope.data.imageSource = "img/ionic.png";
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

.controller('CreateCtrl', function($scope, Rides, $rootScope, $state){
  $scope.$on('$ionicView.enter', function(e) {
    $scope.ride={};
    $scope.CreateRide = function(){
      Rides.Create($rootScope.email, $scope.ride.departure, $scope.ride.destination, $scope.ride.time, $scope.ride.passengers);
      Rides.getAvailableRides().then(function(response) {
        $scope.rides = response;
      });
      $state.go('tab.account');
    };
  });
});