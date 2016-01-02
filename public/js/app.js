'use strict';
angular.module('portfolio', ['ui.router'])
  .constant('ENV', {
    API_URL: 'mailgunurl'
  })
  .config(function($stateProvider, $urlRouteProvider) {
    $urlRouteProvider.otherwise('/');

    $stateProvider
      .state('home',
      { url: '/',
        templateUrl: 'templates/home.html'
      })
      .state('/portfolio',
      { url: '/portfolio',
        templateUrl: 'templates/portfolio.html'});
  });
