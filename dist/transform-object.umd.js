(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['transform-object'] = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // Based on ramda assoc
  var assoc = function assoc(prop, val, obj) {
    var result = {};

    for (var p in obj) {
      result[p] = obj[p];
    }

    result[prop] = val;
    return result;
  }; // Based on ramda _curry1


  var curry1 = function curry1(fn) {
    return function f1(_a) {
      if (arguments.length === 0) return f1;
      return fn.apply(this, arguments);
    };
  }; // Based on ramda _curry2


  var curry2 = function curry2(fn) {
    return function f2(a, b) {
      if (arguments.length === 0) return f2;
      if (arguments.length === 1) return curry1(function (_b) {
        return fn(a, _b);
      });
      return fn(a, b);
    };
  };

  var capitalize = function capitalize(str) {
    return "".concat(str.slice(0, 1).toUpperCase()).concat(str.slice(1).toLowerCase());
  };

  var camelize = function camelize(str) {
    var parts = str.split('_');
    return [parts[0]].concat(_toConsumableArray(parts.slice(1).map(function (part) {
      return capitalize(part);
    }))).join('');
  };

  var snakify = function snakify(str) {
    return str.replace(/\W+/g, ' ').split(RegExp(' |\\B(?=[A-Z])')).map(function (word) {
      return word.toLowerCase();
    }).join('_');
  };
  /**
   * Creates a new object with all the first level keys changed to camelcase. See
   * camelizeAllKeysDeep for renaming nested keys.
   *
   * Example:
   *
   *   camelizeAllKeys({target_user: {target_name: 'John'}});
   *     // => {targetUser: {target_name: 'John'}}
   */


  var camelizeAllKeys = curry1(function (obj) {
    if (obj === null || _typeof(obj) !== 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
      return assoc(camelize(key), obj[key], acc);
    }, {});
  });
  /**
   * Creates a new object with all the keys changed to camelcase.
   *
   * Example:
   *
   *   camelizeAllKeysDeep({user_name: 'John});
   *     // => {userName: 'John'}
   *
   * Example with nested object:
   *
   *   camelizeAllKeysDeep({target_user: {target_name: 'John'}});
   *     // => {targetUser: {targetName: 'John'}}
   */

  var camelizeAllKeysDeep = curry1(function (obj) {
    if (obj === null || _typeof(obj) !== 'object') {
      return obj;
    } else if (Array.isArray(obj)) {
      return obj.map(function (elem) {
        return camelizeAllKeysDeep(elem);
      });
    }

    return Object.keys(obj).reduce(function (acc, key) {
      return assoc(camelize(key), camelizeAllKeysDeep(obj[key]), acc);
    }, {});
  });
  /**
   * Creates a new object with the own properties of the provided object, but the
   * keys listed in keysToCamelize list renamed to camelcase.
   *
   * Example:
   *
   *   camelizeKeysDeep(['user_name'], {user_name: 'John});
   *     // => {userName: 'John'}
   *
   * Example with nested object:
   *
   *   camelizeKeysDeep(['target_user'], {target_user: {target_name: 'John'}});
   *     // => {targetUser: {targetName: 'John'}}
   */

  var camelizeKeysDeep = curry2(function (keysToCamelize, obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      var shouldCamelize = keysToCamelize.includes(key);
      var newKey = shouldCamelize ? camelize(key) : key;
      var newValue = shouldCamelize ? camelizeAllKeysDeep(obj[key]) : obj[key];
      return assoc(newKey, newValue, acc);
    }, {});
  });
  /**
   * Creates a new object with all the first level keys changed to snakecase. See
   * snakifyAllKeysDeep for renaming nested keys.
   *
   * Example:
   *
   *   snakifyAllKeys({targetUser: {targetName: 'John'}});
   *     // => {target_user: {targetName: 'John'}}
   */

  var snakifyAllKeys = curry1(function (obj) {
    if (obj === null || _typeof(obj) !== 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
      return assoc(snakify(key), obj[key], acc);
    }, {});
  });
  /**
   * Creates a new object with all the keys changed to snakecase.
   *
   * Example:
   *
   *   snakifyAllKeysDeep({userName: 'John});
   *     // => {user_name: 'John'}
   *
   * Example with nested object:
   *
   *   snakifyAllKeysDeep({targetUser: {targetName: 'John'}});
   *     // => {target_user: {target_name: 'John'}}
   */

  var snakifyAllKeysDeep = curry1(function (keysToSnakify) {
    if (keysToSnakify === null || _typeof(keysToSnakify) !== 'object') {
      return keysToSnakify;
    } else if (Array.isArray(keysToSnakify)) {
      return keysToSnakify.map(function (elem) {
        return snakifyAllKeysDeep(elem);
      });
    }

    return Object.keys(keysToSnakify).reduce(function (acc, key) {
      return assoc(snakify(key), snakifyAllKeysDeep(keysToSnakify[key]), acc);
    }, {});
  });
  /**
   * Creates a new object with the own properties of the provided object, but the
   * keys listed in keysToSnakify list renamed to snakecase.
   *
   * Example:
   *
   *   snakifyKeysDeep(['user_name'], {userName: 'John});
   *     // => {user_name: 'John'}
   *
   * Example with nested object:
   *
   *   snakifyKeysDeep(['targetUser'], {targetUser: {targetName: 'John'}});
   *     // => {target_user: {target_name: 'John'}}
   */

  var snakifyKeysDeep = curry2(function (keysToSnakify, obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      var shouldSnakify = keysToSnakify.includes(key);
      var newKey = shouldSnakify ? snakify(key) : key;
      var newValue = shouldSnakify ? snakifyAllKeysDeep(obj[key]) : obj[key];
      return assoc(newKey, newValue, acc);
    }, {});
  });
  /**
   * Creates a new object with the own properties of the provided object, but the
   * keys renamed according to the keysMap object as `{oldKey: newKey}`.
   * When some key is not found in the keysMap, then it's passed as-is.
   *
   * If instead of new key array is specified then the first element will be used
   * as a new key and the second element will be used as a keysMap for a nested
   * object value.
   *
   * Keep in mind that in the case of keys conflict the behaviour is undefined
   * and the result may vary between various JS engines!
   *
   * Example:
   *
   *   renameKeys({oldName: 'newName'}, {oldName: 'value'})
   *     // => {newName: 'value'}
   *
   * Example with nested object:
   *
   *   renameKeys(
   *     {oldName: ['newName', {oldNestedName: 'newNestedName'}]},
   *     {oldName: {oldNestedName: 'value'}}
   *   )
   *     // => {newName: {newNestedName: 'value'}}
   */

  var renameKeys = curry2(function (keysMap, obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      var value = keysMap[key];

      if (Array.isArray(value)) {
        var nestedObject = obj[key];

        if (!nestedObject || _typeof(nestedObject) !== 'object') {
          throw new Error('Nested value should be an object');
        }

        return assoc(value[0] || key, renameKeys(value[1], nestedObject), acc);
      } else {
        return assoc(value || key, obj[key], acc);
      }
    }, {});
  });

  exports.camelizeAllKeys = camelizeAllKeys;
  exports.camelizeAllKeysDeep = camelizeAllKeysDeep;
  exports.camelizeKeysDeep = camelizeKeysDeep;
  exports.renameKeys = renameKeys;
  exports.snakifyAllKeys = snakifyAllKeys;
  exports.snakifyAllKeysDeep = snakifyAllKeysDeep;
  exports.snakifyKeysDeep = snakifyKeysDeep;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
