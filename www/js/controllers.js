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

.controller('RidesCtrl', function($scope, Rides, $rootScope,$state) {
  // With
  $scope.$on('$ionicView.enter', function(e) {
    if ($rootScope.isLoggedIn) {
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
    } else {
      $state.go('tab.dash');
    }
  });

  //You can check either here or on front end if user is logged in or not and on the basis of that do any logic or show any UI
  //To simplify just inject $rootScope and use variable isLoggedIn to check the user status
  //Call logout to logout the user and set the variable to false
  
})


.controller('RideDetailCtrl', function($scope, $stateParams, Rides) {
  //$scope.ride = Rides.get($stateParams.rideId);
})


.controller('AccountCtrl', function($scope, Rides,$rootScope, $state) {// location settings here
  $scope.$on('$ionicView.enter', function(e) {
    if ($rootScope.isLoggedIn) {
      $scope.imageSource = window.localStorage.getItem($rootScope.key);
      $scope.takePicture = function(){
        navigator.camera.getPicture(function(imageData){
          $scope.imageSource = 'data:image/jpeg;base64,' + imageData;
          window.localStorage.removeItem($rootScope.key);
          window.localStorage.setItem($rootScope.key, 'data:image/jpeg;base64,' + imageData);
        }, 
        function(message){
          console.log(message);
        }, 
        { quality: 50, destinationType: navigator.camera.DestinationType.DATA_URL, sourceType: navigator.camera.PictureSourceType.camera, allowEdit:true, targetHeight:50, targetWidth:50 });
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
    } else {
      $state.go('tab.dash');
    }
  })
})

.controller('CreateCtrl', function($scope, Rides, $rootScope, $state){
  $scope.$on('$ionicView.enter', function(e) {
    if ($rootScope.isLoggedIn) {
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
    } else {
      $state.go('tab.dash');
    }
  });
});