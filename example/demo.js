(function() {
  angular.module('app', ['builder', 'builder.components', 'validator.rules', 'color.picker']).run(['$builder', function($builder) {}]).controller('DemoController', [
    '$scope', '$builder', '$validator', function($scope, $builder, $validator) {
      var select2, textbox;
      $scope.config = $builder.config;
      textbox = $builder.addFormObject('default', {
        id: 'textbox',
        component: 'textInput',
        label: 'First Name',
        description: 'First Name',
        placeholder: 'First Name',
        required: true,
        editable: true
      });
      select2 = $builder.addFormObject('default', {
        id: 'callToAction',
        component: 'callToAction',
        label: 'callToAction',
        required: false,
        editable: true
      });
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

  $(document).ready(function() {});

}).call(this);
