app.controller('PostController', function($scope, postFactory) {
$scope.posts = [];

//getting items from db
  $scope.getPosts = postFactory.getPosts;

  $scope.getPosts()
  .then(function(response){
    console.log(response);
    $scope.closet = response; //the items are populating the array
    console.log($scope.posts);
  })
  .catch(function(error){
    console.log(error);
  })

  //adds submitted item onto closet array and send it to DB
  $scope.addPost = function(post){
       postFactory.addPost(post)
      .then(function(response){
        //console.log('response', response);
        $scope.posts.push(post);
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

  $scope.deletePost = function() {
    //extension todo - only for admins
  }
});
