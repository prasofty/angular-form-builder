angular.module 'app', ['builder', 'builder.components', 'validator.rules']

.run ['$builder', ($builder) ->

]


.controller 'DemoController', ['$scope', '$builder', '$validator', ($scope, $builder, $validator) ->
    # ----------------------------------------
    # builder
    # ----------------------------------------

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
