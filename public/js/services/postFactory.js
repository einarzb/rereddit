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
  //function add posts to db
  postsFactory.addPost = function(post){
    console.log("im addPost and now im in factory")
    return $http.post('/post', post).then(function(response){
      return response.data;//happens later on the future
    });
  };

  //remove post
  postsFactory.removePost = function(id){
    console.log("im removepost in factory");
    console.log(id);
    return $http.delete('/post/' + id).then(function(response){
      console.log(response.data._id); //post id
      return response.data._id;
    });
  };

  //function sends comments to server route and return promise to ctrler
  postsFactory.addComment = function(comment, postId){
    console.log("comment data to send to server:", comment);
    return $http.post('/posts/' + postId, comment)
      .then(function(response){
        // console.log(response);
        // console.log(response.data);
        return response.data;//happens later on the future
      });
  };

  //function get itmes populated in mongoose to the ctrler
    postsFactory.getPosts = function(post){
      return $http.get('/get').then(function(response){
        postsFactory.posts = response.data;
      });
    };

  return postsFactory;

});
