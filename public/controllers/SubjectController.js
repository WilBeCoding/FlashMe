app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', function($scope, $location, $http, $rootScope, UserFactory){
	
	$scope.new = false;
	$scope.visible = false;

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
				$scope.subjects = response

			});
		});

	}

}])
