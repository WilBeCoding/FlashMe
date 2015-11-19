app.controller('DashController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', function($scope, $location, $http, $rootScope, UserFactory){
  UserFactory.getUser();
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
	}, function error(response){
		console.log(response);
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

