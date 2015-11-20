app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', '$state', function($scope, $location, $http, $rootScope, UserFactory, $state){
	UserFactory.getUser().then(function success(){
		var user = UserFactory.readUser();
		$http.defaults.headers.common.user = user;

		$scope.new = false;
		$scope.visible = false;

		$http({
			method: 'GET',
			url: '/newcard'
		}).then(function success(response){
			console.log(response);
			$scope.subjects = response.data.subjects;
		}, function error(response){
			if(response.status === 401){
				$state.go('login');
			};
		});


	  $scope.showAnswer = function(){
	    $scope.visible = (!$scope.visible)? true: false;
	  };

	  $scope.expandLine= function(){
	  	if($scope.new === false) {
	  		$scope.new = true
	  	} else if($scope.new === true) {
	  		$scope.new = false
	  	}
	  }

		$scope.addCard = function(){
			console.log('hello')
			$scope.newCard.user = user;
			$http.post("/newcard", $scope.newCard).then(function success(response){
				console.log('goodbye card')
				$scope.newCard = {};
				$scope.visible = false;
				console.log($scope.newCard)
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