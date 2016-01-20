'use strict';
angular.module('portfolio', [])
  .constant('ENV', {
    API_URL: 'https://mandrillapp.com/api/1.0/messages/send.json',
    APIKEY: 'Zt9VJPNzZOrqVhOrUH3-Uw',
    MYEMAIL: 'benhalverson@me.com'

  })
  // .config(function($stateProvider, $urlRouteProvider) {
  //   $urlRouteProvider.otherwise('/');
  //
  //   $stateProvider
  //     .state('email',
  //     { url: '/email',
  //       controller: 'emailCtrl',
  //       templateUrl: 'templates/home.html'
  //     })
  //     .state('/portfolio',
  //     { url: '/portfolio',
  //       templateUrl: 'templates/portfolio.html'});
  // });
