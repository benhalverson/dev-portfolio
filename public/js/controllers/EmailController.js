angular.module('portfolio', ['email'])

  .controller('EmailController', ['$scope', '$timeout', 'email', function($scope, $timeout, email) {
debugger;
    console.log('controller loaded');
    $scope.successful = false;
    $scope.sendEmail = function(form) {
      console.log('form button clicked');
      email.mandrill('ENV.APIKEY', 'ENV.MYEMAIL', form.email, form.message, form.subject, form.name)
      .then(function(data) {
        $scope.successful = true;
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
  },]);
