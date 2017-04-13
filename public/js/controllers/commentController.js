app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost ) {

  //relevantPost returns theWholePost.data from the postFactory function in APP.js
 $scope.post = relevantPost;
 console.log("im an object full of data");
 console.log($scope.post);
 $scope.text = relevantPost.text;
 //post body
 console.log("im text");
 console.log($scope.text);
 //comments array
 $scope.post.comments;
 console.log("comments array");
 console.log($scope.post.comments);

 //submites comments onto comments array and send it to DB
  $scope.addComment = function (comment) {
    console.log("im in comments");
    postFactory.addComment(comment)
    .then(function(response){
      //populating the client-side array
      $scope.post.comments.push(response.data);
      console.log("populating client-side");
      console.log($scope.post.comments);
      })
    .catch(function(error){
        console.log(error);
      })
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
