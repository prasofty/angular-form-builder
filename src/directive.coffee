
# ----------------------------------------
# builder.directive
# ----------------------------------------
angular.module 'builder.directive', [
    'builder.provider'
    'builder.controller'
    'builder.drag'
    'validator'
]


# ----------------------------------------
# fb-builder
# ----------------------------------------
.directive 'fbBuilder', ['$injector', ($injector) ->
    # providers
    $builder = $injector.get '$builder'
    $drag = $injector.get '$drag'
    $compile = $injector.get '$compile'

    restrict: 'A'
    scope:
        fbBuilder: '='
        fbSettings: '='
    template:
        """
        <div class="panel panel-default">
            <style type='text/css'>
                .fb-builder .panel {
                    background-color: {{config.formBackgroundColor}};
                }
                .fb-builder .panel .panel-body {
                    min-height: 300px;
                }
                .fb-builder .success-message {
                    padding: 0 10px;
                }
                .fb-builder .form-group {
                    background-color: {{config.fieldBackgroundColor}};
                    padding: 10px;
                    margin-bottom: 0;
                }
                .fb-builder .form-group label.fb-optional {
                    color: {{config.optionalLabelColor}};
                }
                .fb-builder .form-group label.fb-optional:after {
                    content: ' {{config.optionalIndicator}}';
                }
                .fb-builder .form-group label.fb-required {
                    color: {{config.requiredLabelColor}};
                }
                .fb-builder .form-group label.fb-required:after {
                    content: ' {{config.requiredIndicator}}';
                }
            </style>
            <div class="panel-heading">
                <h3 class="panel-title">
                    Form Builder
                    <span class="pull-right"><a class="form-settings" ng-hide="!{{fbSettings}}"><i class="fa fa-cog"></i></a></span>
                </h3>
                <div class="form-settings-popover hide">
                    <form class="config-popover">
                        <div class="form-group">
                          <label class='control-label'>Required Indicator</label>
                          <input type='text' ng-model="config.requiredIndicator" validator="[required]" class='form-control'/>
                        </div>
                        <div class="form-group">
                          <label class='control-label'>Required Label Color</label>
                          <color-picker ng-model="config.requiredLabelColor" color-picker-format="'hex'" color-picker-pos="'bottom left'" color-picker-swatch-pos="'left'"></color-picker>
                        </div>
                        <div class="form-group">
                          <label class='control-label'>Optional Indicator</label>
                          <input type='text' ng-model="config.optionalIndicator" validator="[required]" class='form-control'/>
                        </div>
                        <div class="form-group">
                          <label class='control-label'>Optional Label Color</label>
                          <color-picker ng-model="config.optionalLabelColor" color-picker-format="'hex'" color-picker-pos="'bottom left'" color-picker-swatch-pos="'left'"></color-picker>
                        </div>
                        <div class="form-group">
                          <label class='control-label'>Label Position</label>
                          <select ng-model="config.labelPosition" class="form-control">
                            <option value="above">Above</option>
                            <option value="left">Left</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label class='control-label'>Form Background Color</label>
                          <color-picker ng-model="config.formBackgroundColor" color-picker-format="'hex'" color-picker-pos="'bottom left'" color-picker-swatch-pos="'left'"></color-picker>
                        </div>
                        <div class="form-group">
                          <label class='control-label'>Field Background Color</label>
                          <color-picker ng-model="config.fieldBackgroundColor" color-picker-format="'hex'" color-picker-pos="'bottom left'" color-picker-swatch-pos="'left'"></color-picker>
                        </div>
                        <div class="form-group">
                          <label class='control-label'>Success Message</label>
                          <input type='text' ng-model="config.successMessage" validator="[required]" class='form-control'/>
                        </div>
                    </form>
                </div>
            </div>
            <div class="panel-body">
                <div ng-class="{'form-horizontal': config.labelPosition == 'left'}">
                    <div class="success-message">
                        <div class="alert alert-success">
                            {{config.successMessage}}
                        </div>
                    </div>
                    <div class='fb-form-object-editable' ng-repeat="object in formObjects"
                        fb-form-object-editable="object"></div>
                </div>
            </div>
        </div>
        """
    link: (scope, element, attrs) ->
        # ----------------------------------------
        # valuables
        # ----------------------------------------
        scope.formName = attrs.fbBuilder
        $builder.forms[scope.formName] ?= []
        scope.formObjects = $builder.forms[scope.formName]
        beginMove = yes

        # getting config into popover
        scope.config = $builder.config

        configPopover =
            id: "fb-#{Math.random().toString().substr(2)}"
            view: null
            html: $(element).find('.form-settings-popover').html()
        configPopover.html = $(configPopover.html).addClass configPopover.id
        # compile popover
        configPopover.view = $compile(configPopover.html) scope
        $(element).addClass configPopover.id

        $(element).find('.form-settings').popover
            html: yes
            title: 'Form Settings'
            content: configPopover.view
            container: 'body'
            placement: $builder.config.popoverPlacement

        $(element).find('.form-settings').on 'show.bs.popover', ->
            $("div.fb-form-object-editable").popover 'hide'

        $('body').on 'click', (e) ->
            $(element).find('.form-settings').each ->
                if !$(this).is(e.target) and $(this).has(e.target).length == 0 and $('.popover').has(e.target).length == 0
                    $(this).popover 'hide'

        # end popover

        $(element).addClass 'fb-builder'
        $drag.droppable $(element),
            move: (e) ->
                if beginMove
                    # hide all popovers
                    $("div.fb-form-object-editable, div.fb-builder .form-settings").popover 'hide'
                    beginMove = no

                $formObjects = $(element).find '.fb-form-object-editable:not(.empty,.dragging)'
                if $formObjects.length is 0
                    # there are no components in the builder.
                    if $(element).find('.fb-form-object-editable.empty').length is 0
                        $(element).find('>div:first').append $("<div class='fb-form-object-editable empty'></div>")
                    return

                # the positions could added .empty div.
                positions = []
                # first
                positions.push -1000
                for index in [0...$formObjects.length] by 1
                    $formObject = $($formObjects[index])
                    offset = $formObject.offset()
                    height = $formObject.height()
                    positions.push offset.top + height / 2
                positions.push positions[positions.length - 1] + 1000   # last

                # search where should I insert the .empty
                for index in [1...positions.length] by 1
                    if e.pageY > positions[index - 1] and e.pageY <= positions[index]
                        # you known, this one
                        $(element).find('.empty').remove()
                        $empty = $ "<div class='fb-form-object-editable empty'></div>"
                        if index - 1 < $formObjects.length
                            $empty.insertBefore $($formObjects[index - 1])
                        else
                            $empty.insertAfter $($formObjects[index - 2])
                        break
                return
            out: ->
                if beginMove
                    # hide all popovers
                    $("div.fb-form-object-editable, div.fb-builder .form-settings").popover 'hide'
                    beginMove = no

                $(element).find('.empty').remove()
            up: (e, isHover, draggable) ->
                beginMove = yes
                if not $drag.isMouseMoved()
                    # click event
                    $(element).find('.empty').remove()
                    return

                if not isHover and draggable.mode is 'drag'
                    # remove the form object by draggin out
                    formObject = draggable.object.formObject
                    if formObject.editable
                        $builder.removeFormObject attrs.fbBuilder, formObject.index
                else if isHover
                    if draggable.mode is 'mirror'
                        # insert a form object
                        $builder.insertFormObject scope.formName, $(element).find('.empty').index('.fb-form-object-editable'),
                            component: draggable.object.componentName
                    if draggable.mode is 'drag'
                        # update the index of form objects
                        oldIndex = draggable.object.formObject.index
                        newIndex = $(element).find('.empty').index('.fb-form-object-editable')
                        newIndex-- if oldIndex < newIndex
                        $builder.updateFormObjectIndex scope.formName, oldIndex, newIndex
                $(element).find('.empty').remove()
]

# ----------------------------------------
# fb-form-object-editable
# ----------------------------------------
.directive 'fbFormObjectEditable', ['$injector', ($injector) ->
    # providers
    $builder = $injector.get '$builder'
    $drag = $injector.get '$drag'
    $compile = $injector.get '$compile'
    $validator = $injector.get '$validator'

    restrict: 'A'
    controller: 'fbFormObjectEditableController'
    scope:
        formObject: '=fbFormObjectEditable'
    link: (scope, element) ->
        scope.inputArray = [] # just for fix warning
        # get component
        scope.$component = $builder.components[scope.formObject.component]
        # setup scope
        scope.setupScope scope.formObject
        scope.config = $builder.config

        # compile formObject
        scope.$watch '$component.template', (template) ->
            return if not template
            view = $compile(template) scope
            $(element).html view

        # disable click event
        $(element).on 'click', -> no

        # draggable
        $drag.draggable $(element),
            object:
                formObject: scope.formObject

        # do not setup bootstrap popover
        return if not scope.formObject.editable

        # ----------------------------------------
        # bootstrap popover
        # ----------------------------------------
        popover = {}
        scope.$watch '$component.popoverTemplate', (template) ->
            return if not template
            $(element).removeClass popover.id
            popover =
                id: "fb-#{Math.random().toString().substr(2)}"
                isClickedSave: no # If didn't click save then rollback
                view: null
                html: template
            popover.html = $(popover.html).addClass popover.id
            # compile popover
            popover.view = $compile(popover.html) scope
            $(element).addClass popover.id
            $(element).popover
                html: yes
                title: scope.$component.label
                content: popover.view
                container: 'body'
                placement: $builder.config.popoverPlacement
        scope.popover =
            save: ($event) ->
                ###
                The save event of the popover.
                ###
                $event.preventDefault()
                $validator.validate(scope).success ->
                    popover.isClickedSave = yes
                    $(element).popover 'hide'
                return
            remove: ($event) ->
                ###
                The delete event of the popover.
                ###
                $event.preventDefault()

                $builder.removeFormObject scope.$parent.formName, scope.$parent.$index
                $(element).popover 'hide'
                return
            shown: ->
                ###
                The shown event of the popover.
                ###
                scope.data.backup()
                popover.isClickedSave = no
            cancel: ($event) ->
                ###
                The cancel event of the popover.
                ###
                scope.data.rollback()
                if $event
                    # clicked cancel by user
                    $event.preventDefault()
                    $(element).popover 'hide'
                return
        # ----------------------------------------
        # popover.show
        # ----------------------------------------
        $(element).on 'show.bs.popover', ->
            return no if $drag.isMouseMoved()
            # hide other popovers
            $("div.fb-form-object-editable:not(.#{popover.id}), div.fb-builder .form-settings").popover 'hide'

            $popover = $("form.#{popover.id}").closest '.popover'
            if $popover.length > 0
                # fixed offset
                elementOrigin = $(element).offset().top + $(element).height() / 2
                popoverTop = elementOrigin - $popover.height() / 2
                $popover.css
                    position: 'absolute'
                    top: popoverTop

                $popover.show()
                setTimeout ->
                    $popover.addClass 'in'
                    $(element).triggerHandler 'shown.bs.popover'
                , 0
                no
        # ----------------------------------------
        # popover.shown
        # ----------------------------------------
        $(element).on 'shown.bs.popover', ->
            # select the first input
            $(".popover .#{popover.id} input:first").select()
            scope.$apply -> scope.popover.shown()
            return
        # ----------------------------------------
        # popover.hide
        # ----------------------------------------
        $(element).on 'hide.bs.popover', ->
            # do not remove the DOM
            $popover = $("form.#{popover.id}").closest '.popover'
            if not popover.isClickedSave
                # eval the cancel event
                if scope.$$phase or scope.$root.$$phase
                    scope.popover.cancel()
                else
                    scope.$apply -> scope.popover.cancel()
            $popover.removeClass 'in'
            setTimeout ->
                $popover.hide()
            , 300
            no
]


# ----------------------------------------
# fb-components
# ----------------------------------------
.directive 'fbComponents', ->
    restrict: 'A'
    template:
        """
        <ul ng-if="groups.length > 1" class="nav nav-tabs nav-justified">
            <li ng-repeat="group in groups" ng-class="{active:activeGroup==group}">
                <a href='#' ng-click="selectGroup($event, group)">{{group}}</a>
            </li>
        </ul>
        <div class='form-horizontal'>
            <div class='fb-component' ng-repeat="component in components"
                fb-component="component"></div>
        </div>
        """
    controller: 'fbComponentsController'

# ----------------------------------------
# fb-component
# ----------------------------------------
.directive 'fbComponent', ['$injector', ($injector) ->
    # providers
    $builder = $injector.get '$builder'
    $drag = $injector.get '$drag'
    $compile = $injector.get '$compile'

    restrict: 'A'
    scope:
        component: '=fbComponent'
    controller: 'fbComponentController'
    link: (scope, element) ->
        scope.copyObjectToScope scope.component

        $drag.draggable $(element),
            mode: 'mirror'
            defer: no
            object:
                componentName: scope.component.name

        if scope.component.thumbnail
            $(element).html scope.component.thumbnail
        else
            scope.$watch 'component.template', (template) ->
                return if not template
                view = $compile(template) scope
                $(element).html view
]


# ----------------------------------------
# fb-form
# ----------------------------------------
.directive 'fbForm', ['$injector', ($injector) ->
    restrict: 'A'
    require: 'ngModel'  # form data (end-user input value)
    scope:
        # input model for scops in ng-repeat
        formName: '@fbForm'
        input: '=ngModel'
        default: '=fbDefault'
        showSuccessMessage: '=fbShowSuccessMessage'
    template:
        """
        <div class="fb-form">
            <style type='text/css'>
                .fb-form {
                    background-color: {{config.formBackgroundColor}};
                    min-height: 300px;
                    padding: 15px;
                }
                .fb-builder .success-message {
                    padding: 0 10px;
                }
                .fb-form .form-horizontal .form-group {
                    margin-left: 0;
                    margin-right: 0;
                }
                .fb-form .form-group {
                    background-color: {{config.fieldBackgroundColor}};
                    padding: 10px;
                }
                .fb-form .form-group label.fb-optional {
                    color: {{config.optionalLabelColor}};
                }
                .fb-form .form-group label.fb-optional:after {
                    content: ' {{config.optionalIndicator}}';
                }
                .fb-form .form-group label.fb-required {
                    color: {{config.requiredLabelColor}};
                }
                .fb-form .form-group label.fb-required:after {
                    content: ' {{config.requiredIndicator}}';
                }
            </style>
            <div class="success-message" ng-show="showSuccessMessage">
                <div class="alert alert-success">
                    {{config.successMessage}}
                </div>
            </div>
            <div ng-class="{'form-horizontal': config.labelPosition == 'left'}">
                <div class='fb-form-object' ng-repeat="object in form" fb-form-object="object"></div>
            </div>
        </div>
        """
    controller: 'fbFormController'
    link: (scope, element, attrs) ->
        # providers
        $builder = $injector.get '$builder'

        # get the form for controller
        console.log(scope.showSuccessMessage)
        $builder.forms[scope.formName] ?= []
        scope.form = $builder.forms[scope.formName]
        scope.config = $builder.config


]

# ----------------------------------------
# fb-form-object
# ----------------------------------------
.directive 'fbFormObject', ['$injector', ($injector) ->
    # providers
    $builder = $injector.get '$builder'
    $compile = $injector.get '$compile'
    $parse = $injector.get '$parse'

    restrict: 'A'
    controller: 'fbFormObjectController'
    link: (scope, element, attrs) ->
        # ----------------------------------------
        # variables
        # ----------------------------------------
        scope.formObject = $parse(attrs.fbFormObject) scope
        scope.$component = $builder.components[scope.formObject.component]

        # ----------------------------------------
        # scope
        # ----------------------------------------
        # listen (formObject updated
        scope.$on $builder.broadcastChannel.updateInput, -> scope.updateInput scope.inputText
        if scope.$component.arrayToText
            scope.inputArray = []
            # watch (end-user updated input of the form
            scope.$watch 'inputArray', (newValue, oldValue) ->
                # array input, like checkbox
                return if newValue is oldValue
                checked = []
                for index of scope.inputArray when scope.inputArray[index]
                    checked.push scope.options[index] ? scope.inputArray[index]
                scope.inputText = checked.join ', '
            , yes
        scope.$watch 'inputText', -> scope.updateInput scope.inputText
        # watch (management updated form objects
        scope.$watch attrs.fbFormObject, ->
            scope.copyObjectToScope scope.formObject
        , yes

        scope.$watch '$component.template', (template) ->
            return if not template
            $template = $(template)
            # add validator
            $input = $template.find "[ng-model='inputText']"
            $input.attr
                validator: '{{validation}}'
            # compile
            view = $compile($template) scope
            $(element).html view
            if $input.data('plugin') and $.fn.select2
                $input.select2()

        # select the first option
        if not scope.$component.arrayToText and scope.formObject.options.length > 0
            scope.inputText = scope.formObject.options[0]

        # set default value
        scope.$watch "default['#{scope.formObject.id}']", (value) ->
            return if not value
            if scope.$component.arrayToText
                scope.inputArray = value
            else
                scope.inputText = value
]
