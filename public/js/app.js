var app = angular.module('rereddit', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('home');
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/partial-home.html',
      controller: 'PostController'
    })
        .state('home.addPost',{
          url: '/addPost',
          templateUrl: '/templates/partial-home-add.html',
          controller: 'PostController'
        })
            .state('home.addPost.text',{
              url: '/text',
              templateUrl: '/templates/partial-home-add-text.html',
              controller: 'PostController'
            })
            .state('home.addPost.link',{
              url: '/link',
              templateUrl: '/templates/partial-home-add-link.html',
              controller: 'PostController'
            })
    .state('comment', {
      url: '/post/:id',
      templateUrl: '/templates/comments.html',
      controller: 'CommentController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthController'
    });


});
