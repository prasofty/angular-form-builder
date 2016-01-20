(function() {
  angular.module('app', ['builder', 'builder.components', 'validator.rules', 'color.picker', 'ui.bootstrap']).run(['$builder', function($builder) {}]).controller('DemoController', [
    '$scope', '$builder', '$validator', '$uibModal', function($scope, $builder, $validator, $uibModal) {
      var dateInput, textbox;
      $scope.config = $builder.config;
      textbox = $builder.addFormObject('default', {
        id: 'textbox',
        component: 'textInput',
        label: 'First Name',
        description: 'First Name',
        placeholder: 'First Name',
        tooltip: 'First Name',
        required: true,
        editable: true
      });
      dateInput = $builder.addFormObject('default', {
        id: 'dateTimeInput',
        component: 'dateTimeInput',
        label: 'dateTimeInput',
        required: false,
        editable: true
      });
      $scope.form = $builder.forms['default'];
      $scope.input = [];
      $scope.defaultValue = {
        textbox: 'kumarb'
      };
      $scope.submit = function() {
        return $validator.validate($scope, 'default').success(function() {
          return console.log('success');
        }).error(function() {
          return console.log('error');
        });
      };
      return $scope.formSettingModal = function() {
        var modalInstance;
        return modalInstance = $uibModal.open({
          templateUrl: '/example/form_settings_modal.html',
          controller: 'formSettingsCtrl'
        });
      };
    }
  ]).controller('formSettingsCtrl', [
    '$scope', '$builder', '$uibModalInstance', function($scope, $builder, $uibModalInstance) {
      $scope.config = $builder.config;
      return $scope.cancel = function() {
        return $uibModalInstance.dismiss('cancel');
      };
    }
  ]);

  $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $(".datepicker").datepicker({
      changeMonth: true,
      changeYear: true
    });
    return $(".datetimepicker").datetimepicker({
      changeMonth: true,
      changeYear: true,
      controlType: 'select',
      oneLine: true,
      timeFormat: 'hh:mm tt'
    });
  });

}).call(this);
