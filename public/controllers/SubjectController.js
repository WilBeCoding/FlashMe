app.controller('SubjectController', ['$scope', '$location', '$rootScope', '$http', function($scope, $location, $rootScope, $http){
	
	$scope.addSubject = function(){
		//http.post to subjects table(need router.post route)
		// $http.post("/newsubject", $scope.subject)
		$rootScope.subject = $scope.subject;
		$scope.subject = '';
		$location.path('/createcard')
	}

	$scope.addCard = function(){
		console.log($scope.newCard)
		//http.post to cards table
		// $http.post("/newcard", $scope.newCard)
		$rootScope.subject = "";
		$scope.newCard = {};
	}
	
}])


 