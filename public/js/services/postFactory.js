app.factory('postFactory', function($http) {

  //function adds items to db
  function addPost(post){
    console.log("now im in factory")
    return $http.post('/post', post).then(function(response){
      return response.data;//happens later on the future
    });
  };
  //function get itmes populated in mongoose to the ctrler
    function getPosts(post){
      return $http.get('/get').then(function(response){
        return response.data;
      });
    };

  return {getPosts:getPosts, addPost:addPost}

});
