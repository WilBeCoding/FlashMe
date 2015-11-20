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

  $scope.reportRating = function(rating, id){
    console.log("FUNCTION FIRED", rating, id);
    if (rating === 3){
      $scope.cards.shift();
    } else if (rating === 2){
      $scope.cards.push($scope.cards.shift());
    } else {
      if ($scope.cards.length > 6){
        $scope.cards.splice(4, 0, $scope.cards.shift());  
      } else {
        $scope.cards.splice($scope.cards.length - 1, 0, $scope.cards.shift());
      }
    }
    $scope.guess = "";
    $http({
      method: 'POST',
      url: '/study',
      data: {rating: rating, id: id}
    }).then(function success(response){
      console.log("UPDATED???");

    })
  }
}])
