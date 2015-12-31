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
