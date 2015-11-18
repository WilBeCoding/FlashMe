app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope){
	

	$scope.addCard = function(){
		console.log("user:", $rootScope.user)
		$scope.newCard.user = $rootScope.user;
		$http.post("/createcard", $scope.newCard);
		console.log($scope.newCard)

		$scope.newCard = {};
	}
	
}])


 