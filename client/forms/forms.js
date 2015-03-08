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

      $http.get('/api/backgrounds').success(function(data) {
        $scope.backgrounds = data;
      });

      // For debugging only:
      window.data = $scope;

      $scope.$watch('selectedBackground', function(newValue) {
        if (newValue) {
          $('html').css('background-image', 'url(/assets/img/backgrounds/' + newValue + ')');
        }
      });
    }
  ]
);

