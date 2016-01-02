angular.module('portfolio', [])
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
      console.log('factory data', data);
    }

    function sendgrid(user, key, to, from, message, subject) {
      return $http.jsonp('ENV.SENDGRID_URL');
    }
  }]);
