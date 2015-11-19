app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', '$state', function($scope, $location, $http, $rootScope, UserFactory, $state){
  UserFactory.getUser();

	var user = UserFactory.readUser();
	$http.defaults.headers.common.user = user;

	$http({
		method: 'GET',
		url: '/newcard'
	}).then(function success(response){
		$scope.subjects = response
	}, function error(response){
		if(response.status === 401){
			$state.go('login');
		};
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
