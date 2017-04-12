app.controller('PostController', function($scope, postFactory) {
$scope.title;
$scope.sub;

//recaptcha
var vm = this;
vm.publickey = "6LcmyBwUAAAAADTYu8rt_yTNBSAizOo3IJD18Kkd"
vm.signup = function() {
  console.log("einar")
}
  $scope.addPost = function(post) {
    console.log(post.myRecaptchaResponse);
    alert("im submit")
    // if($scope.title > 0 && $scope.link > 0 || $scope.text > 0 ){
    //   alert("yo oy yo")
    // } else {
    //   alert ("please fill in")
    // }
  }

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
