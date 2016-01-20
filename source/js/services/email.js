angular.module('portfolio')
  .service('email', ['$http', 'ENV', function($http, ENV) {
    this.mandrill = function (key, to, from, message, subject, name) {
      console.log('service data', data);
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
      };
      console.log('message: ', data);
      console.log('status', data.data.status);
      return  $http.post(ENV.API_URL, data)
    }
  }]);
