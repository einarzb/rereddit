app.controller('PostController', function($scope, postFactory, $state) {
$scope.posts = [];
$scope.title;

//getting items from db
  $scope.getPosts = postFactory.getPosts;

  $scope.getPosts()
  .then(function(){
    //console.log(response);
    $scope.posts = postFactory.posts; //the items are populating the array
    //console.log($scope.posts);
  })
  .catch(function(error){
    console.log(error);
  })

  //adds submitted post onto posts array and send it to DB
  $scope.addPost = function(post){
        console.log("im in controller");
        postFactory.addPost(post)
          .then(function(response){
          //populating the client-side array
          $scope.posts.push(response.data);
          //after submit we return to home
          $state.go('home');
      })
      .catch(function(error){
        console.log(error);
      })
    };

$scope.removePost = function(){
    var self = this;
    console.log(self);
    console.log(self.post._id);
  postFactory.removePost(self.post._id)
    .then(function(response){
      console.log(response);
    //splicing the client-side array by the position of a certain index inside the ng-repeat's self scope
    $scope.posts.splice(self.$index, 1);
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
    alert("thank you")
    //todo
  }

  $scope.downvote = function() {
    alert("fuck you")
    //todo
  }

  $scope.deletePost = function() {
    //extension todo - only for admins
  }
});
