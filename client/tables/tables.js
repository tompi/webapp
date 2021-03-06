angular.module('webapp').controller(
  'TablesCtrl',
  [
    '$scope',
    'carsProvider',
    'Restangular',
    'socket',
    function TableCtrl($scope, carsProvider, Restangular, socket) {
      var todoApi = Restangular.all('api/v1/Todo');

      var formatTodo = function(todo) {
        var m = moment(todo.created);
        todo.createdTextual = m.fromNow();
      };

      todoApi.getList().then(function(todos) {
        _.each(todos, formatTodo);
        $scope.todos = todos;
      });
      $scope.todoColumnDefs = [ 
        { "data": "text"},
        { "data": "done" },
        { "data": "createdTextual" }
      ]; 
      $scope.sorting = [[2, 'desc']];

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
        { "data": "category"},
        { "data": "name" },
        { "data": "price" }
      ]; 

      $scope.sampleProductCategories = carsProvider.cars;
      socket.on('newTodo', function(todo) {
        $scope.todos.push(todo);
      });
    }
  ]
);

