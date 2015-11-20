app.controller('RegistrationController', ['$scope','$http', 'RegistrationFactory', '$state', function($scope, $http, RegistrationFactory, $state){

  $scope.registerUser = register;

  function register(email, password){
    RegistrationFactory.register(email, password).then(function success(response){
      $state.go('dashboard');
    });
  }

}]);
