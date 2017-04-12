app.controller('PostController', function($scope, postFactory) {
$scope.posts = [];
$scope.title;
$scope.sub;

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
