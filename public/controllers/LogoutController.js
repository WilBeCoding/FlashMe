app.controller('LogoutController', function LogoutController($scope, $http, $location, UserFactory){
  UserFactory.logout()
  $location.path('/login');
});
