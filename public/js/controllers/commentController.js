app.controller('CommentController', function($scope, $stateParams, postFactory) {

    $scope.getPostId = function (currentId) {
    console.log("im in getPostId in comment ctrler");
    console.log(currentId);
    for (var i = 0; i < postFactory.posts.length; i++) {
      if(postFactory.posts[i].currentId === currentId){
        return i; //returns location of current city
      }
    };
  }

    $scope.addComment = function (comment,currentId) {
        console.log(currentId);
        console.log(comment);
        console.log("im in comments");
        console.log( $scope.text);
        var i = getPostId(currentId);
        postFactory.posts[i].comments.push(comment);
  };

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
