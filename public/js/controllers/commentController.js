app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost ) {

//relevantPost returns theWholePost.data from the postFactory function in APP.js
 $scope.post = relevantPost;

 console.log($scope.post);
 $scope.text = relevantPost.text;

 //comments array
 $scope.post.comments;

 //submites comments onto comments array and send it to DB
  $scope.addComment = function (comment) {
    // console.log($stateParams.id);
    postFactory.addComment(comment, $stateParams.id)
    .then(function(response) { //full object
      //populating the client-side array
      $scope.post = response; //reassinging the array with the object that update the comments array too
      // $scope.post.comments.push(response);
      })
    .catch(function(error){
        console.log(error);
      })
  };

$scope.removeComment = function (){
  console.log("im in remove comment");
  var self = this;
  console.log($stateParams.id); //post's id
  // console.log(self);
  // console.log(self.comment._id); //comment id
  // console.log(self.$index); //comments index
  postFactory.removeComment(self.comment._id, $stateParams.id)
    .then(function(response){
      console.log("im rsponse");
        console.log(response);//output id of post!
        //splicing the client-side array by the position of a certain index inside the ng-repeat's self scope
        $scope.post = response;
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
