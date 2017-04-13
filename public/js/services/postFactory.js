app.factory('postFactory', function($http) {

  var postsFactory = {posts:[]};

  postsFactory.getPostId = function (currentId) {
  console.log("im in getPostId in postfactory");
  console.log(currentId);
  for (var i = 0; i < postsFactory.posts.length; i++) {
    if(postsFactory.posts[i]._id === currentId){
      return postsFactory.posts[i]; //returns location of current city
    }
  };
}
  //function adds items to db
  postsFactory.addPost = function(post){
    console.log("now im in factory")
    return $http.post('/post', post).then(function(response){
      return response.data;//happens later on the future
    });
  };

  //function get itmes populated in mongoose to the ctrler
    postsFactory.getPosts= function(post){
      return $http.get('/get').then(function(response){
        postsFactory.posts = response.data;
      });
    };

  return postsFactory;

});
