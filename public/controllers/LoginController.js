app.factory('UserFactory', function UserFactory($http){
  'use strict';
  return {
    login: login
  };

  function login (email, password){
    return $http.post('/login', {
      email: email,
      password: password
    });
  }
});

app.controller('LoginController', ['$scope', '$http', 'UserFactory', function LoginController($scope, $http, UserFactory){

  $scope.userLogin = logUserIn;

  function logUserIn(username, password){
    UserFactory.login(username, password).then(function success(response){
      console.log(response.data);
      $scope.user = response.data.user;
      localStorage.setItem('token', response.data.token);
    }, handleError);
  }

  function handleError(response){
    alert("Invalid Username / Password");
  }

}]);
