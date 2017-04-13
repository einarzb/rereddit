var app = angular.module('rereddit', ['ui.router', 'vcRecaptcha']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('home');
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/partial-home.html',
      controller: 'PostController'
    })
    .state('addPost',{
      url: '/addPost',
      templateUrl: '/templates/partial-home-add.html',
      controller: 'PostController'
    })
          .state('addPost.text',{
            url: '/text',
            templateUrl: '/templates/partial-home-add-text.html',
            controller: 'PostController'
          })
          .state('addPost.link',{
            url: '/link',
            templateUrl: '/templates/partial-home-add-link.html',
            controller: 'PostController'
          })
    .state('comment', {
      url: '/comments/:id', //stateParams use this id in ctrler
      templateUrl: '/templates/comments.html',
      controller: 'CommentController',
      //resolve - function that runs only when comment state is on. only when it ends loading - then the ctrler would run.
      resolve: {
        //relevantPost is a function build here and injected onto CommentController
        relevantPost: function (postFactory, $stateParams, $http) {
              //fetching post id from routing via stateParams of the comment routing
               var postId = $stateParams.id;
               //ive created a new route from server that gets the post's id
               return $http.get("/post/" + postId)
               .then(function (theWholePost) {
                       console.log("the next obj comes from app.js");
                       return theWholePost.data;
               })
          }
       }
      })

    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthController'
    });


});
