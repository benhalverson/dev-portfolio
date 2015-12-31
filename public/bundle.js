'use strict';
angular.module('portfolio', ['ui-router'])
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
      .state('/portfolio'
      { url: '/portfolio',
        templateUrl: 'templates/portfolio.html'})
  });

angular.module('emailme', [])
  .factory('email', ['$http', function($http) {

    function mailgun(key, to, from, message) {
      //do stuff
    }

    function mandrill(key, to, from, message, subject, name) {
      var data = {
        'key': key,
        'message': {
          'from-email': from,
          'to': [
            {
              'email': to,
              'to': 'to'
            }
          ],
          'autotext': true,
          'subject': name + " - " + subject,
          'html': message
        }
      }
      return $http.post('ENV.API_URL', data);
    }
  }])
