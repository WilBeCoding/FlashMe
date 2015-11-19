app.controller('SubjectController', ['$scope', '$location', '$http', '$rootScope', function($scope, $location, $http, $rootScope){
	$scope.visible = false;
  $scope.toggleInputs = function(){
    $scope.visible = (!$scope.visible)? true: false;
  };

	$scope.addCard = function(){
		//http.post to cards table
		$http.post("/createcard", $scope.newCard);
		console.log($scope.newCard)
		$scope.newCard = {};
	}


	
}])


 