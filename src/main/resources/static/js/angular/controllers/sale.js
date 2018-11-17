routerApp.controller("sale", function($scope, $http, $location, $window, $routeParams) {
  $scope.selected = undefined;
  $scope.titles = [
    {title: 'Amazing Grace', type: 'movie'},
    {title: 'Amazing Grace', type: 'song'}
  ];

});