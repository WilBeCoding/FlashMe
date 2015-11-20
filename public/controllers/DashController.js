app.controller('DashController', ['$scope', '$location', '$http', '$rootScope', 'UserFactory', '$state', function($scope, $location, $http, $rootScope, UserFactory, $state){

  UserFactory.getUser().then(function success(){
  	var user = UserFactory.readUser();
  	$http.defaults.headers.common.user = user;

		$http({
			method: 'GET',
			url: '/newcard'
		}).then(function success(response){
      if (response.data.noSubjects) {
        $state.go('createCard');
			} else {
				$scope.subjects = response.data.subjects;
				$scope.cards = response.data.cards;
			}
		}, function error(){
	    $state.go('login');
	  });

		$scope.studyCards = function(subject){
			$http({
				method: 'GET',
				url: '/study/' + subject,
			}).then(function success(response){

			});
		}

  	$scope.selectSubjects = function(subject){
  		$http({
  			method: 'POST',
  			url: '/subjects',
  			data: {subjects: subject}
  		}).then(function success(response){
  			
  		});
  	}
  }, function error(response){
    $state.go('login');
  });
}]);
