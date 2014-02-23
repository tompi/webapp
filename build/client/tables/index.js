webapp.controller(
  'TablesCtrl',
  [
    '$scope',
    'carsProvider',
    'Restangular',
    function TableCtrl($scope, carsProvider, Restangular) {
      var todoApi = Restangular.all('api/v1/Todo');

      todoApi.getList().then(function(todos) {
        $scope.todos = todos;
      });
      $scope.todoColumnDefs = [ 
        { "mDataProp": "text", "aTargets":[0]},
        { "mDataProp": "done", "aTargets":[1] }
      ]; 

      $scope.message = '';

      $scope.myCallback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {            
        $('td:eq(2)', nRow).bind('click', function() {
          $scope.$apply(function() {
            $scope.someClickHandler(aData);
          });
        });
        return nRow;
      };

      $scope.someClickHandler = function(info) {
        $scope.message = 'clicked: '+ info.price;
      };

      $scope.columnDefs = [ 
        { "mDataProp": "category", "aTargets":[0]},
        { "mDataProp": "name", "aTargets":[1] },
        { "mDataProp": "price", "aTargets":[2] }
      ]; 

      $scope.overrideOptions = {
      };

      $scope.sampleProductCategories = carsProvider.cars;
    }
  ]
);

