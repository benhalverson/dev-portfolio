angular.module('portfolio')

  .controller('EmailController', function($scope, $timeout, email, ENV) {
    console.log('controller loaded');
    $scope.successful = false;
    $scope.sendEmail = function(form) {
      console.log('form button clicked');
      email.mandrill(ENV.APIKEY, ENV.MYEMAIL, form.email, form.message, form.subject, form.name)
        .then(function(response) {
          $scope.successful = true;
          console.log('response', response);
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
