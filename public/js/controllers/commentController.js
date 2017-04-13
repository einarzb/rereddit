app.controller('CommentController', function($scope, $stateParams, postFactory) {

  $scope.addComment = function() {
    console.log("im in comments");
  }

  $scope.upvote = function() {
    //todo
  }

  $scope.downvote = function() {
    //todo
  }

  $scope.deleteComment = function() {
    //extension todo - only for admins
  }

});
