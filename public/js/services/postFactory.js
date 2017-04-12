app.factory('postFactory', function($http) {
  //function adds items to db
  function addPost(post){
    return $http.post('/redditdb',post).then(function(response){
      return response.data;//happens later on the future
    });
  };
  //function get itmes populated in mongoose to the ctrler
    function getPosts(){
      return $http.get('/redditdb').then(function(response){
        return response.data;
      });
    };

  return {getPosts:getPosts, addPost:addPost}

});
