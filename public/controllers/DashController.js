app.controller('DashController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', '$state', function($scope, $location, $http, $rootScope, UserFactory, $state){
  UserFactory.getUser().then(function success(){
  	var user = UserFactory.readUser();
  	$http.defaults.headers.common.user = user;

	$http({
		method: 'GET',
		url: '/newcard'
	}).then(function success(response){
		$scope.subjects = response.data;
		$scope.subjects.forEach(function(each){
			each.selected = 'false';
		})
		console.log("SCOPE.SUBJECTS", $scope.subjects);
	}, function error(){
    $state.go('login');
  });
	
	$scope.selectSubjects = function(){
		console.log("SCOPE CONTROLLER DATA:", $scope.subjects);
		$http({
			method: 'POST',
			url: '/subjects',
			data: {subjects: $scope.subjects}
		}).then(function success(response){
			console.log("CONTROLLER RESPONSE:", response)
		})
	}


}])