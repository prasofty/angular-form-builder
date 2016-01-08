angular.module 'app', ['builder', 'builder.components', 'validator.rules', 'color.picker', 'typeahead']

.run ['$builder', ($builder) ->

]


.controller 'DemoController', ['$scope', '$builder', '$validator', ($scope, $builder, $validator) ->
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

    select2 = $builder.addFormObject 'default',
        id: 'callToAction'
        component: 'callToAction'
        label: 'callToAction'
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
]

$(document).ready ->
