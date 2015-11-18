app.controller('RegistrationController', ['$scope','$http', 'RegistrationFactory', '$rootScope', function($scope, $http, RegistrationFactory, $rootScope){

  $scope.registerUser = register;

  function register(email, password){
    RegistrationFactory.register(email, password).then(function success(response){
      $rootScope.user = email;
      console.log(response.data); // This is the registration info sent back from the server.
      localStorage.setItem("token", response.data.token);
    }, handleError);
  }

  function handleError(response){
    alert("User already exists.");
  }

}]);
