"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(api) {
  api.describe({
    key: 'extraBabelPlugins',
    config: {
      default: [],

      schema(joi) {
        return joi.array();
      }

    }
  });
}