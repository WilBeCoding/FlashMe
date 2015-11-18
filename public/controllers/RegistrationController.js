app.factory('RegistrationFactory', function RegistrationFactory($http){
  'use strict';
  return {
    register: register
  };

  function register(email, password){
    return $http.post('/register', {
      email: email,
      password: password
    });
  }
});

app.controller('RegistrationController', ['$scope','$http', 'RegistrationFactory', function($scope, $http, RegistrationFactory){

  $scope.registerUser = register;

  function register(email, password){
    RegistrationFactory.register(email, password).then(function success(response){
      console.log(response.data); // This is the registration info sent back from the server.
      localStorage.setItem("token", response.data.token);
    }, handleError);
  }

  function handleError(response){
    alert("User already exists.");
  }

}]);
