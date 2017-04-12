app.controller('PostController', function(vcRecaptchaService, $scope, postFactory) {
$scope.title;
$scope.sub;

//recaptcha
var vm = this;
	vm.signup = function() {
    //if string is empty
		if (vcRecaptchaService.getResponse() === "") {
			alert("Please resolve the captcha and submit!")
		} else {
      alert(vcRecaptchaService.getResponse());
      var post_data = {
        'title':vm.title,
        'text':vm.text,
        'link':vm.link,
        'g-recaptcha-response':vcRecaptchaService.getResponse() //send g-captcah-reponse to our server
      }
		}
	};

  $scope.addPost = function() {
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
