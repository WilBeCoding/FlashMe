app.controller('LoginController', ['$scope', '$http', 'UserFactory', '$rootScope', function LoginController($scope, $http, UserFactory, $rootScope){

  $scope.userLogin = logUserIn;

  function logUserIn(username, password){
    UserFactory.login(username, password).then(function success(response){
      $scope.user = response.data.user;
      $rootScope.user = response.data.user;
    }, handleError);
  }

  function handleError(response){
    alert("Invalid Username / Password");
  }

}]);
