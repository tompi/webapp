webapp.controller(
  'FormsCtrl', 
  [
    '$scope', 
    '$http',
    function($scope, $http) {
      $scope.birthDate = new Date(1975, 0, 29);
      $scope.firstName = 'Thomas';
      $scope.lastName = 'Haukland';
      $scope.email = 'thomas.haukland@gmail.com';
      $scope.sex = 'male';

      $scope.possibleInterests = [
        'soccer', 'billiards', 'ping pong',
        'tv', 'bridge', 'running', 'junk food'
      ];

      $scope.selectedInterests = {};

       $scope.open = function($event) {
             $event.preventDefault();
             $event.stopPropagation();

             $scope.opened = true;
       };
       $scope.format = 'yyyy-MM-dd';

       // For debugging only:
       window.data = $scope;
    }
  ]
);

