app.factory('RegistrationFactory', function RegistrationFactory($http, AuthTokenFactory){
  'use strict';
  return {
    register: register
  };

  function register(email, password){
    return $http.post('/register', {
      email: email,
      password: password
    }).then(function success(response){
      AuthTokenFactory.setToken(response.data.token);
      return response;
    });
  }
});

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
