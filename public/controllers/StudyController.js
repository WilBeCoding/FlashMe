app.controller('StudyController', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location){
  var id = $location.url().split('/').pop();
  $http({
    method: 'POST',
    url: '/subjects',
    data: {id: id}
  }).then(function success(response){
    $scope.cards = response.data.cards;
    console.log("CONTROLLER RESPONSE:", response.data.cards);
  });
}])
