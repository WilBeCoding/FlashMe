app.controller('CardController', ['$scope', '$location', '$http', 'UserFactory', '$state', function($scope, $location, $http, UserFactory, $state){
  UserFactory.getUser().then(function success(response){
    var user = UserFactory.readUser();
  	$http.defaults.headers.common.user = user;
    var id = $location.url().split('/').pop();
    console.log("What is the ID?", id);

    $http({
      method: 'POST',
      url: '/cards',
      data: {subject: id}
    }).then(function success(response){
      console.log(response);
      $scope.cards = response.data.rows;
    });
  });

}])
