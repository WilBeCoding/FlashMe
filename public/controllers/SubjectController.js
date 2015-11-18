app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope){
	
	$http.get('/createcard/:id').then(function(response){
		console.log("RESPONSE FROM CONTROLLER:", response)
	})

	$scope.addCard = function(){
		console.log("user:", $rootScope.user)
		$scope.newCard.user = $rootScope.user;
		$http.post("/createcard", $scope.newCard);
		console.log($scope.newCard)

		$scope.newCard = {};
	}
	
}])


 