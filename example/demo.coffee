angular.module 'app', ['builder', 'builder.components', 'validator.rules', 'color.picker', 'ui.bootstrap']

.run ['$builder', ($builder) ->

]


.controller 'DemoController', ['$scope', '$builder', '$validator', '$uibModal', ($scope, $builder, $validator, $uibModal) ->
    # ----------------------------------------
    # builder
    # ----------------------------------------
    $scope.config = $builder.config
    textbox = $builder.addFormObject 'default',
        id: 'textbox'
        component: 'textInput'
        label: 'First Name'
        description: 'First Name'
        placeholder: 'First Name'
        required: yes
        editable: yes

    dateInput = $builder.addFormObject 'default',
        id: 'dateTimeInput'
        component: 'dateTimeInput'
        label: 'dateTimeInput'
        required: no
        editable: yes

    # formObjects
    $scope.form = $builder.forms['default']

    # ----------------------------------------
    # form
    # ----------------------------------------
    # user input value
    $scope.input = []
    $scope.defaultValue = {}
    $scope.submit = ->
        $validator.validate $scope, 'default'
        .success -> console.log 'success'
        .error -> console.log 'error'

    $scope.formSettingModal = ->
        modalInstance = $uibModal.open
            templateUrl: '/example/form_settings_modal.html'
            controller: 'formSettingsCtrl'
]

.controller 'formSettingsCtrl', ['$scope', '$builder', '$uibModalInstance', ($scope, $builder, $uibModalInstance) ->

    $scope.config = $builder.config

    $scope.cancel = ->
        $uibModalInstance.dismiss('cancel')
]

$(document).ready ->
    $(".datepicker").datepicker({
        changeMonth: true,
        changeYear: true
    })
    $(".datetimepicker").datetimepicker({
        changeMonth: true,
        changeYear: true
        controlType: 'select',
        oneLine: true,
        timeFormat: 'hh:mm tt'
    });
