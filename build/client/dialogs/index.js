webapp.controller(
  'ModalInstanceCtrl',
  [
    '$scope',
    '$modalInstance',
    'items',
    function ModalInstanceCtrl($scope, $modalInstance, items) {

      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]
);

webapp.controller(
  'DialogsCtrl',
  [
    '$scope',
    'alertService',
    '$modal',
    function($scope, alertService, $modal) {
      $scope.success = function(msg) {
        alertService.success(msg);
      };
      $scope.info = function(msg) {
        alertService.info(msg);
      };
      $scope.warning = function(msg) {
        alertService.warning(msg);
      };
      $scope.error = function(msg) {
        alertService.error(msg);
      };
      $scope.items = ['Chuck Norris', 'Jean Claude Van Damme', 'Bruce Willis', 'Arnold Schwarzenegger'];
      $scope.selected = $scope.items[0];

      $scope.open = function () {
        var modalInstance = $modal.open({
          templateUrl: 'myModalContent',
          controller: 'ModalInstanceCtrl',
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }
                                 );
      };
    }
  ]
);

