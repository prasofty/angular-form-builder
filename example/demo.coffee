angular.module 'app', ['builder', 'builder.components', 'validator.rules', 'color.picker']

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

    textbox = $builder.addFormObject 'default',
        id: 'textbox'
        component: 'textInput'
        label: 'Last Name'
        description: 'Last Name'
        placeholder: 'Last Name'
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
