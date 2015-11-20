app.controller('RegistrationController', ['$scope','$http', 'RegistrationFactory', '$rootScope', '$state', '$window', function($scope, $http, RegistrationFactory, $rootScope, $state, $window){

  $scope.registerUser = register;

  function register(email, password){
    RegistrationFactory.register(email, password).then(function success(response){
      $state.go('dashboard');
    });
  }

}]);
