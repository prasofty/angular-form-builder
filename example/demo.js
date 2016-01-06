(function() {
  angular.module('app', ['builder', 'builder.components', 'validator.rules']).run(['$builder', function($builder) {}]).controller('DemoController', [
    '$scope', '$builder', '$validator', function($scope, $builder, $validator) {
      $scope.form = $builder.forms['default'];
      $scope.input = [];
      $scope.defaultValue = {};
      return $scope.submit = function() {
        return $validator.validate($scope, 'default').success(function() {
          return console.log('success');
        }).error(function() {
          return console.log('error');
        });
      };
    }
  ]);

}).call(this);
