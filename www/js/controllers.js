angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window, $document,User,$rootScope,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    if ($rootScope.isLoggedIn) {
      $state.go('tab.account');
    } else {
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
        var secret = CryptoJS.MD5($scope.loginData.email+$scope.loginData.password+'secretsecretessecrets');
        if(User.login({token:secret})){
          $rootScope.isLoggedIn = true;
          $rootScope.email = $scope.loginData.email;
          $rootScope.key = secret;
          $state.go('tab.rides');
        }else{
          $rootScope.isLoggedIn = false;
          $scope.toggleAccountForm();
        }
      }
    }
  })
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


.controller('AccountCtrl', function($scope, Rides,$rootScope) {// location settings here
  $scope.$on('$ionicView.enter', function(e) {
    $scope.data = {};
    //$scope.data.imageSource = "img/rideshare.JPG";
    $scope.data.imageSource = window.localStorage.getItem($rootScope.key);
    $scope.takePicture = function(){
      navigator.camera.getPicture(function(imageData){
        $scope.data.imageSource = imageData;
      }, 
      function(message){
        console.log(message);
      }, 
      { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.camera });
      window.localStorage.setItem($rootScope.key, $scope.data.imageSource);
    };

    Rides.offeredRides($rootScope.email).then(function(response) {
        $scope.offeredRides = response;
    });

    Rides.bookedRides($rootScope.email).then(function(response) {
        $scope.bookedRides = response;
    });

    $scope.delete = function(id) {
      Rides.delete(id);

      Rides.offeredRides($rootScope.email).then(function(response) {
        $scope.offeredRides = response;
      });

      Rides.bookedRides($rootScope.email).then(function(response) {
          $scope.bookedRides = response;
      });
    }
  })
})

.controller('CreateCtrl', function($scope, Rides, $rootScope, $state){
  $scope.$on('$ionicView.enter', function(e) {
    $scope.ride={};
    $scope.CreateRide = function(){
      Rides.Create($rootScope.email, $scope.ride.departure, $scope.ride.destination, $scope.ride.time, $scope.ride.passengers);
      Rides.getAvailableRides().then(function(response) {
        $scope.rides = response;
      });
      function alertCallback() {
          $state.go('tab.account');
      }
      navigator.notification.alert("Ride sucessfully created.", alertCallback, "Congratulations!");
    };
  });
});