angular.module 'app', ['builder', 'builder.components', 'validator.rules', 'color.picker']

.run ['$builder', ($builder) ->

]


.controller 'DemoController', ['$scope', '$builder', '$validator', ($scope, $builder, $validator) ->
    # ----------------------------------------
    # builder
    # ----------------------------------------
    console.log($builder.config.labelPosition)
    textbox = $builder.addFormObject 'default',
        id: 'textbox'
        component: 'textInput'
        label: 'Name'
        description: 'Your name'
        placeholder: 'Your name'
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
