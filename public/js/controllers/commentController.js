app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost ) {
 $scope.post = relevantPost; //relevantPost returns theWholePost.data from the postFactory function in APP.js
 console.log("im scope a ");
 console.log($scope.post);
 $scope.text = relevantPost.text;
 console.log("im text");
 console.log($scope.text);

  $scope.addComment = function (comment,currentId) {
        console.log(currentId);
        console.log(comment);
        console.log("im in comments");
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
