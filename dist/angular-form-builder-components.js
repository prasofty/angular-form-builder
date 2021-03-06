(function() {
  angular.module('builder.components', ['builder', 'validator.rules']).config([
    '$builderProvider', function($builderProvider) {
      $builderProvider.registerComponent('textInput', {
        group: 'Default',
        label: 'Text Input',
        description: 'description',
        placeholder: 'placeholder',
        tooltip: 'tooltip',
        required: false,
        validationOptions: [
          {
            label: 'none',
            rule: '/.*/'
          }, {
            label: 'number',
            rule: '[number]'
          }, {
            label: 'email',
            rule: '[email]'
          }, {
            label: 'url',
            rule: '[url]'
          }
        ],
        thumbnailUrl: 'example/textInputThumbnail.html',
        templateUrl: 'example/textInput.html',
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Tooltip</label>\n        <input type='text' ng-model=\"tooltip\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('textArea', {
        group: 'Default',
        label: 'Text Area',
        description: 'description',
        placeholder: 'placeholder',
        required: false,
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"textarea-icon\">Text Area</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Textarea</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n        <textarea ng-model=\"inputText\" validator-required=\"{{required}}\" rows=\"3\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" class=\"form-control\" placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('checkbox', {
        group: 'Default',
        label: 'Checkbox',
        description: 'description',
        placeholder: 'placeholder',
        required: false,
        options: ['value one', 'value two'],
        arrayToText: true,
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"checkbox-icon\">Checkbox</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Checkbox</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n     <label for=\"{{formName+index}}\" class=\"control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n     <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n         <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n         <div class='checkbox' ng-repeat=\"item in options track by $index\">\n             <label><input type='checkbox' ng-model=\"$parent.inputArray[$index]\" value='item'/>\n                 {{item}}\n             </label>\n         </div>\n         <p class='help-block'>{{description}}</p>\n     </div>\n </div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('radio', {
        group: 'Default',
        label: 'Radio',
        description: 'description',
        placeholder: 'placeholder',
        required: false,
        options: ['value one', 'value two'],
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"radiobutton-icon\">Radio</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Radio</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n        <div class='radio' ng-repeat=\"item in options track by $index\">\n            <label><input name='{{formName+index}}' ng-model=\"$parent.inputText\" validator-group=\"{{formName}}\" value='{{item}}' type='radio'/>\n                {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('select', {
        group: 'Default',
        label: 'Select',
        description: 'description',
        placeholder: 'placeholder',
        required: false,
        options: ['value one', 'value two'],
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"select-icon\">Select</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Select</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n            <select ng-options=\"value for value in options\" id=\"{{formName+index}}\" class=\"form-control\"\n                ng-model=\"inputText\" ng-init=\"inputText = options[0]\"/>\n            <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('select2', {
        group: 'Default',
        label: 'Select2',
        description: 'description',
        placeholder: 'placeholder',
        required: false,
        options: ['value one', 'value two'],
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"select-icon\">Select</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Select2</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n            <select ng-options=\"value for value in options\" id=\"{{formName+index}}\" class=\"form-control\"\n                ng-model=\"inputText\" ng-init=\"inputText = options[0]\" data-plugin=\"select2\"/>\n            <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('fileUploader', {
        group: 'Default',
        label: 'fileUploader',
        description: 'description',
        placeholder: 'placeholder',
        required: false,
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"select-icon\">File upload</i>\n    <div class=\"form-builder-element-title\">\n     <h6>File upload</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n        <input type = \"file\" id=\"{{formName+index}}\" class=\"form-control\" validator-required=\"{{required}}\" />\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" class='form-control' name=\"fieldName\" validator=\"[required]\" required/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('externalLink', {
        group: 'Default',
        label: 'External Link',
        description: 'description',
        placeholder: 'placeholder',
        validation: "[url]",
        required: false,
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"select-icon\">External Link</i>\n    <div class=\"form-builder-element-title\">\n     <h6>External Link</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n        <input type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" class=\"form-control\" placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('callToAction', {
        group: 'Default',
        label: 'Call to Action',
        description: 'description',
        placeholder: 'none',
        required: false,
        extraConfigs: {
          titleTextColor: '#8a6d3b',
          titleBackgroundColor: '#fcf8e3',
          bodyTextColor: '#000000',
          bodyBackgroundColor: '#FFFFFF',
          classNameOptions: [
            {
              label: 'Warning',
              value: 'fa-warning'
            }, {
              label: 'Check',
              value: 'fa-check'
            }, {
              label: 'Check Square',
              value: 'fa-check-square-o'
            }, {
              label: 'Circle',
              value: 'fa-circle-o'
            }
          ]
        },
        design: {
          currentLabel: 'fa-warning'
        },
        thumbnail: "<div class=\"form-builder-element\">\n    <i class=\"select-icon\">Call to Action</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Call to Action</h6>\n    </div>\n</div>",
        template: "<div class=\"panel\">\n    <div for=\"{{formName+index}}\" class=\"panel-heading\" ng-style=\"{'background-color': extraConfigs.titleBackgroundColor}\">\n        <h3 class=\"panel-title\" ng-style=\"{'color':extraConfigs.titleTextColor}\">\n            <i class=\"fa {{design.currentLabel}}\"></i>\n            {{label}}\n        </h3>\n    </div>\n    <div class=\"panel-body\" ng-style=\"{'color':extraConfigs.bodyTextColor, 'background-color': extraConfigs.bodyBackgroundColor}\">\n        {{description}}\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Title</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Title Text Color</label>\n        <color-picker color-picker-format=\"'hex'\" color-picker-pos=\"'bottom left'\" color-picker-swatch-pos=\"'left'\" ng-model=\"extraConfigs.titleTextColor\"></color-picker>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Title Background Color</label>\n        <color-picker color-picker-format=\"'hex'\" color-picker-pos=\"'bottom left'\" color-picker-swatch-pos=\"'left'\" ng-model=\"extraConfigs.titleBackgroundColor\"></color-picker>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Body Text Color</label>\n        <color-picker color-picker-format=\"'hex'\" color-picker-pos=\"'bottom left'\" color-picker-swatch-pos=\"'left'\" ng-model=\"extraConfigs.bodyTextColor\"></color-picker>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Body Background Color</label>\n        <color-picker color-picker-format=\"'hex'\" color-picker-pos=\"'bottom left'\" color-picker-swatch-pos=\"'left'\" ng-model=\"extraConfigs.bodyBackgroundColor\"></color-picker>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Icon Class Name</label>\n        <select class=\"form-control\" ng-model=\"design.currentLabel\">\n          <option ng-repeat=\"option in extraConfigs.classNameOptions\" value=\"{{option.value}}\">{{option.label}}</option>\n        </select>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('dateInput', {
        index: 0,
        group: 'Default',
        label: 'Date Input',
        description: 'description',
        placeholder: 'mm/dd/yyyy',
        required: false,
        thumbnail: "<div class=\"form-builder-element\">\n     <i class=\"date-icon\">Date Input</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Date</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n        <input type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" class=\"form-control datepicker\" placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('dateTimeInput', {
        index: 0,
        group: 'Default',
        label: 'Date Time Input',
        description: 'description',
        placeholder: 'mm/dd/yyyy hh:mm',
        required: false,
        thumbnail: "<div class=\"form-builder-element\">\n     <i class=\"date-time-icon\">Date Input</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Date Time</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n        <input type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" class=\"form-control datetimepicker\" placeholder=\"{{placeholder}}\"/>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      return $builderProvider.registerComponent('colorPicker', {
        group: 'Default',
        label: 'Color Picker',
        description: 'description',
        placeholder: 'placeholder',
        required: false,
        thumbnail: "<div class=\"form-builder-element\">\n     <i class=\"date-time-icon\">Date Input</i>\n    <div class=\"form-builder-element-title\">\n     <h6>Color Picker</h6>\n    </div>\n</div>",
        template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"control-label\" ng-class=\"{'fb-required':required, 'fb-optional':required == 0, 'col-sm-3': config.labelPosition == 'left'}\">{{label}}</label>\n    <div ng-class=\"{'col-sm-9': config.labelPosition == 'left'}\">\n        <color-picker color-picker-format=\"'hex'\"\n                      color-picker-pos=\"'bottom left'\"\n                      color-picker-swatch-pos=\"'left'\"\n                      color-picker-alpha=\"false\"\n                      color-picker-swatch-bootstrap=\"false\"\n                      ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" placeholder=\"{{placeholder}}\"></color-picker>\n        <p class=\"help-block\">{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class=\"control-label\">Label</label>\n        <input type=\"text\" ng-model=\"label\" validator=\"[required]\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Field Name</label>\n        <input type='text' ng-model=\"fieldName\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class=\"control-label\">Description</label>\n        <input type=\"text\" ng-model=\"description\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label class=\"control-label\">Placeholder</label>\n        <input type=\"text\" ng-model=\"placeholder\" class=\"form-control\">\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type=\"checkbox\" ng-model=\"required\">\n            Required\n        </label>\n    </div>\n    <hr/>\n    <div class=\"form-group\">\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
    }
  ]);

}).call(this);
