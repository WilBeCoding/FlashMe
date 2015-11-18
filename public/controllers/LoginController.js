app.controller('LoginController', ['$scope', '$http', 'UserFactory', '$rootScope', function LoginController($scope, $http, UserFactory, $rootScope){

  $scope.userLogin = logUserIn;

  function logUserIn(email, password){
    UserFactory.login(email, password).then(function success(response){
      $scope.user = response.data.user;
      $rootScope.user = email;
    }, handleError);
  }

  function handleError(response){
    alert("Invalid Username / Password");
  }

}]);
