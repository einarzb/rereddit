app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost ) {

//relevantPost returns theWholePost.data from the postFactory function in APP.js
 $scope.post = relevantPost;

 //console.log($scope.post);
 $scope.text = relevantPost.text;

 //comments array
 $scope.post.comments;

 //submites comments onto comments array and send it to DB
  $scope.addComment = function (comment) {
    // console.log($stateParams.id);
    console.log(comment); //comment is object {with text}
    console.log(comment.commentText);
    //im sending to the factory an object of commentText (from client) and the post's id (I get from app.js)
    postFactory.addComment(comment, $stateParams.id)
    .then(function(response) { //response is the full object(post)
      //reassinging the array with the object that update the comments array too
      $scope.post = response;
      //clear input field
      $scope.comment.commentText = "";
      //array length
      console.log($scope.post.comments.length);
      })
    .catch(function(error){
        console.log(error);
      })
  };

$scope.removeComment = function (){
  var self = this;
  console.log($stateParams.id); //post's id
  // console.log(self);
  // console.log(self.comment._id); //comment id
  // console.log(self.$index); //comments index
  postFactory.removeComment(self.comment._id, $stateParams.id)
    .then(function(response){
        //splicing the client-side array by the position of a certain index inside the ng-repeat's self scope
         $scope.post.comments.splice(self.$index, 1);
        //comments array length
         console.log($scope.post.comments.length);

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

});
