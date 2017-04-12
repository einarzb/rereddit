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
<<<<<<< HEAD
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
=======
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
>>>>>>> 014d8765a56fb4800fe9cc4379eaa3f1c0fab1c7
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
