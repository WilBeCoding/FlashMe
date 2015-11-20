app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', '$state', function($scope, $location, $http, $rootScope, UserFactory, $state){
	UserFactory.getUser().then(function success(){
		var user = UserFactory.readUser();
		$http.defaults.headers.common.user = user;

		$http({
			method: 'GET',
			url: '/newcard'
		}).then(function success(response){

			$scope.subjects = response.data.subjects;
		}, function error(response){
			if(response.status === 401){
				$state.go('login');
			};
		});
		
		$scope.addCard = function(){

			$scope.newCard.user = user;
			$http.post("/newcard", $scope.newCard).then(function success(response){

				$scope.newCard = {};
			

				$http({
					method: 'GET',
					url: '/newcard'
				}).then(function success(response){
					$scope.subjects = response.data.subjects;

				});
			});

		}

	}, function error(response){
		$state.go('login');
	});

	

}])
