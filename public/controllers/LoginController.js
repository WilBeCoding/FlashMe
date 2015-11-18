app.controller('LoginController', ['$scope', '$http', 'UserFactory', function LoginController($scope, $http, UserFactory){

  $scope.userLogin = logUserIn;

  function logUserIn(username, password){
    UserFactory.login(username, password).then(function success(response){
      $scope.user = response.data.user;
    }, handleError);
  }

  function handleError(response){
    alert("Invalid Username / Password");
  }

}]);
