app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost ) {

  $scope.comments = [];


  //relevantPost returns theWholePost.data from the postFactory function in APP.js
 $scope.post = relevantPost;
 console.log("im an object full of data");
 console.log($scope.post);
 $scope.text = relevantPost.text;
 console.log("im text");
 console.log($scope.text);
 //comments
 $scope.post.comments;
 console.log($scope.post.comments);
 //comments text
 // $scope.post.comments.author;
 // console.log("fuckckckck");
 // console.log($scope.post.comments.author);
 // $scope.post.comments.commentText;


 // $scope.comments = relevantPost.comments;
 // console.log();

 //submites comments onto comments array and send it to DB
  $scope.addComment = function (comment) {
    console.log("im in comments");
    postFactory.addComment(comment)
    .then(function(response){
      //populating the client-side array
      $scope.comments.push(response.data);
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
