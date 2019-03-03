const coderlistApp = angular.module('coderlistApp', []);

const url = 'http://localhost:3000';

coderlistApp.controller('todolistController', function todosController($scope, $http) {
  
  $scope.render = () => {
    $http.get(url + '/todos').then(
        function(todos) {
          $scope.todos = todos.data;
        }
      )
  };
  $scope.render();

  $scope.createTodo = () => {
    if( $scope.todo !== undefined) {
      $scope.todo.isCompleted = false;
      $scope.todo.time = new Date().getTime();
      $http.post(url + '/todos', $scope.todo).then(
        function(response) {
          $scope.render();
        },
        function(err) {
          console.log(err.status);
        }
      ).then( () => {$scope.todo.title=''})

    }
  }
  
  $scope.editTodo = (todo) => {
    $http.put(url + '/todos', todo).then(
      function(response) {
        $scope.render();
      },
      function(err) {
        console.log(err.status);
      }
    )
  }

  $scope.deleteTodo = (todoId) => {
    $http.delete(url + '/todos/todo/'+todoId).then(
      function(response){
        $scope.render();
      },
      function(err) {
        console.log(err.status);
      }
    )
  }

  $scope.completeTodo = (todoId) => {
    $http.put(url + '/todos/complete-todo', {_id: todoId}).then(
      function(response){
        $scope.render();
      },
      function (err){
        console.log(err.status);
      }
      )
  }

  $scope.sortBy = 'isCompleted';
})