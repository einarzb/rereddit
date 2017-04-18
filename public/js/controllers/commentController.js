app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost ) {
  //comment counter
  $scope.commentCounter = 0;

  //relevantPost returns theWholePost.data from the postFactory function in APP.js
 $scope.post = relevantPost;
 // console.log("im an object full of data");
 console.log($scope.post);
 $scope.text = relevantPost.text;
 //post body
 // console.log("im text");
 // console.log($scope.text);
 //comments array
 $scope.post.comments;
 // console.log("comments array from db");
 // console.log($scope.post.comments);

//length of comments array - num of coments
 // $scope.commentCounter = $scope.post.comments.length;
  //  if($scope.commentCounter == "0") {
  //     $scope.commentCounter = "no";
  //  }
 //console.log($scope.commentCounter);

 //submites comments onto comments array and send it to DB
  $scope.addComment = function (comment) {
    console.log($stateParams.id);
    //console.log(comment);
    postFactory.addComment(comment, $stateParams.id)
    .then(function(response) {
    //  console.log(response); //full object
      console.log(response);
      //populating the client-side array
      $scope.post = response;
      // console.log("populating client-side");
      // console.log($scope.post.comments);
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
