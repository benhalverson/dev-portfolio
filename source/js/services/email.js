angular.module('portfolio')
  .service('email', ['$http', 'ENV', function($http, ENV) {
    this.mandrill = function (key, to, from, message, subject, name) {
      var data = {
        'key': key,
        'message': {
          'from_email': from,
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
      };
      return  $http.post(ENV.API_URL, data)
    }
  }]);
