app.factory('UserFactory', function UserFactory($http, AuthTokenFactory){
  'use strict';
  return {
    login: login,
    logout: logout
  };

  function login (email, password){
    return $http.post('/login', {
      email: email,
      password: password
    }).then(function success(response){
      AuthTokenFactory.setToken(response.data.token);
      return response;
    });
  }

  function logout(){
    AuthTokenFactory.setToken();  // Sets token to nothing removing it from localStorage.
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
