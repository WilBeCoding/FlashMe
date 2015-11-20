app.controller('LoginController', ['$scope', '$http', 'UserFactory', '$rootScope', '$state', function LoginController($scope, $http, UserFactory, $rootScope, $state){

  $scope.userLogin = logUserIn;

  function logUserIn(email, password){
    UserFactory.login(email, password).then(function success(response){
      $state.go('dashboard');
    }, handleError);
  }

  function handleError(response){
    alert("Invalid Username / Password");
  }

}]);
