app.controller('DashController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', function($scope, $location, $http, $rootScope, UserFactory){
  UserFactory.getUser();
	var user = UserFactory.readUser();
	$http.defaults.headers.common.user = user;

	$http({
		method: 'GET',
		url: '/newcard'
	}).then(function success(response){
		$scope.subjects = response
		console.log(response);
	}, function error(response){
		console.log(response);
	});
	
}])

