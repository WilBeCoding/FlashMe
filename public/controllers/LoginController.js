app.controller('LoginController', [$scope, $http, function LoginController($scope, $http, UserFactory){
  // var login = this;

  $scope.login = login;

  function login(username, password){
    UserFactory.login(username, password).then(function success(response){
      $scope.user = response.data.user;
      alert(response.data.token);
    }, handleError);
  }

  function handleError(response){
    alert("Error: ", response.data);
  }

}]);

app.factory('UserFactory', function UserFactory($http, process.env.API_URL){
  'use strict';
  return {
    login: login
  };

  function login(username, password){
    return $http.post(process.env.API_URL + '/login', {
      username: username,
      password: password
    });
  }
});
