app.controller('SubjectController', function($scope, $location){
	$scope.redirectCards = function(){
		console.log("working?")
		$location.path('/createcard')
	}
})

