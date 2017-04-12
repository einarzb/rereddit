var app = angular.module('rereddit', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'PostController'
    })
    .state('add', {
      url: '/add',
      templateUrl: '/templates/add.html',
      controller: 'PostController'
    })
        .state('add.link', {
          url: '/link',
          templateUrl: '/templates/add-link.html',
          controller: 'PostController'
        })
        .state('add.text', {
          url: '/text',
          templateUrl: '/templates/add-text.html',
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

  $urlRouterProvider.otherwise('home');

});
