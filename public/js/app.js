'use strict';
angular.module('portfolio', ['ui.router'])
  .constant('ENV', {
    API_URL: 'https://mandrillapp.com/api/1.0/messages/send.json',
    APIKEY: 'Zt9VJPNzZOrqVhOrUH3-Uw',
    SENDGRID_URL: 'url',
    MYEMAIL: 'benhalverson@me.com'
  })
  .config(function($stateProvider, $urlRouteProvider) {
    $urlRouteProvider.otherwise('/');

    $stateProvider
      .state('home',
      { url: '/',
        controller: 'EmailController',
        templateUrl: 'templates/home.html'
      })
      .state('/portfolio',
      { url: '/portfolio',
        templateUrl: 'templates/portfolio.html'});
  });
