angular.module('portfolio')

  .controller('EmailController', function($scope, $timeout, email, ENV) {
    $scope.successful = false;
    $scope.sendEmail = function(form) {
      email.mandrill(ENV.APIKEY, ENV.MYEMAIL, form.email, form.message, form.subject, form.name)
        .then(function(response) {
          $scope.successful = true;
          console.log('response', response);

          $scope.response = response;
          $timeout(clear, 3000)
        .catch(function(error) {
          console.log('Error', error);
        });
        });
    };

    function clear() {
      $scope.successful = false;
      $scope.form.name = '';
    }
  });
