app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope){
	

	$scope.addCard = function(){
		//http.post to cards table
		$http.post("/createcard", $scope.newCard);
		console.log($scope.newCard)

		$scope.newCard = {};
	}
	
}])


 