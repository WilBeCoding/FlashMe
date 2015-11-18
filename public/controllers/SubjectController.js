app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', function($scope, $location, $http, $rootScope, UserFactory){
	console.log("I'm in the SubjectController!");
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

	$scope.addCard = function(){
		console.log("user:", user)
		$scope.newCard.user = user;
		$http.post("/newcard", $scope.newCard).then(function success(response){
			$scope.newCard = {};
			console.log($scope.newCard)
			$http({
				method: 'GET',
				url: '/newcard'
			}).then(function success(response){
				$scope.subjects = response
			});
		});

	}

}])
