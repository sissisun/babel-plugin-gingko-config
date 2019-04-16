"use strict";

var _helperModuleImports = require("@babel/helper-module-imports");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      VariableDeclaration: function VariableDeclaration(path, state) {
        var node = path.node;
        var _state$opts = state.opts,
            _state$opts$libraryNa = _state$opts.libraryName,
            libraryName = _state$opts$libraryNa === void 0 ? 'gingko' : _state$opts$libraryNa,
            _state$opts$targetVar = _state$opts.targetVar,
            targetVar = _state$opts$targetVar === void 0 ? 'externalConfig' : _state$opts$targetVar,
            _state$opts$configNam = _state$opts.configName,
            configName = _state$opts$configNam === void 0 ? 'gingkoconfig' : _state$opts$configNam;

        if (state.file && state.file.opts) {
          if (!new RegExp(libraryName).test(state.file.opts.filename)) {
            return;
          }
        }

        var pathRegResult = /(.*)node\_modules/.exec(__dirname);
        var rootpath = pathRegResult ? pathRegResult[1] : __dirname;
        node.declarations.forEach(function (dec) {
          if (dec.id.name === targetVar) {
            var importResult = (0, _helperModuleImports.addDefault)(path, _path["default"].join(rootpath, configName), {
              nameHint: targetVar
            });
            dec.init = t.identifier(importResult.name);
          }
        });
      }
    }
  };
};