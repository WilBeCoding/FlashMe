app.controller('LogoutController', function LogoutController($scope, $http, UserFactory){
  UserFactory.logout()
})
