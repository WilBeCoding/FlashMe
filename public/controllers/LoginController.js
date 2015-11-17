app.controller('LoginController', [$scope, $http, function LoginController($scope, $http, UserFactory){
  var login = this;

  login.login = login;

  function login(username, password){
    UserFactory.login(username, password).then(function success(response){
      login.user = response.data;
    }, handleError);
  }

  function handleError(response){
    alert("Error: ", response.data);
  }

  app.factory('UserFactory', function UserFactory($http, API_URL){
    'use strict';
    return {
      login: login
    };

    function login(username, password){
      return $http.post(API_URL + '/login', {
        username: username,
        password: password
      });
    }
  });

}])
