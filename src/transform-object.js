// Based on ramda assoc
const assoc = (prop, val, obj) => {
  let result = {};

  for (let p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
};

// Based on ramda _curry1
const curry1 = fn => {
  return function f1(_a) {
    if (arguments.length === 0) return f1;
    return fn.apply(this, arguments);
  };
};

// Based on ramda _curry2
const curry2 = fn => {
  return function f2(a, b) {
    if (arguments.length === 0) return f2;
    if (arguments.length === 1) return curry1(_b => fn(a, _b));
    return fn(a, b);
  };
};

const capitalize = str => `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;

const camelize = str => {
  const parts = str.split('_');
  return [parts[0], ...parts.slice(1).map(part => capitalize(part))].join('');
};

const snakify = str =>
  str
    .replace(/\W+/g, ' ')
    .split(RegExp(' |\\B(?=[A-Z])'))
    .map(word => word.toLowerCase())
    .join('_');

/**
 * Creates a new object with all the first level keys changed to camelcase. See
 * camelizeAllKeysDeep for renaming nested keys.
 *
 * Example:
 *
 *   camelizeAllKeys({target_user: {target_name: 'John'}});
 *     // => {targetUser: {target_name: 'John'}}
 */
export const camelizeAllKeys = curry1(obj => {
  if (obj === null || typeof obj !== 'object') return obj;

  return Object.keys(obj).reduce((acc, key) => assoc(camelize(key), obj[key], acc), {});
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
export const camelizeAllKeysDeep = curry1(obj => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(elem => camelizeAllKeysDeep(elem));
  }

  return Object.keys(obj).reduce((acc, key) => {
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
export const camelizeKeysDeep = curry2((keysToCamelize, obj) =>
  Object.keys(obj).reduce((acc, key) => {
    const shouldCamelize = keysToCamelize.includes(key);
    const newKey = shouldCamelize ? camelize(key) : key;
    const newValue = shouldCamelize ? camelizeAllKeysDeep(obj[key]) : obj[key];
    return assoc(newKey, newValue, acc);
  }, {})
);

/**
 * Creates a new object with all the first level keys changed to snakecase. See
 * snakifyAllKeysDeep for renaming nested keys.
 *
 * Example:
 *
 *   snakifyAllKeys({targetUser: {targetName: 'John'}});
 *     // => {target_user: {targetName: 'John'}}
 */
export const snakifyAllKeys = curry1(obj => {
  if (obj === null || typeof obj !== 'object') return obj;

  return Object.keys(obj).reduce((acc, key) => assoc(snakify(key), obj[key], acc), {});
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
export const snakifyAllKeysDeep = curry1(keysToSnakify => {
  if (keysToSnakify === null || typeof keysToSnakify !== 'object') {
    return keysToSnakify;
  } else if (Array.isArray(keysToSnakify)) {
    return keysToSnakify.map(elem => snakifyAllKeysDeep(elem));
  }

  return Object.keys(keysToSnakify).reduce((acc, key) => {
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
export const snakifyKeysDeep = curry2((keysToSnakify, obj) =>
  Object.keys(obj).reduce((acc, key) => {
    const shouldSnakify = keysToSnakify.includes(key);
    const newKey = shouldSnakify ? snakify(key) : key;
    const newValue = shouldSnakify ? snakifyAllKeysDeep(obj[key]) : obj[key];
    return assoc(newKey, newValue, acc);
  }, {})
);

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
export const renameKeys = curry2((keysMap, obj) =>
  Object.keys(obj).reduce((acc, key) => {
    const value = keysMap[key];
    if (Array.isArray(value)) {
      const nestedObject = obj[key];
      if (!nestedObject || typeof nestedObject !== 'object') {
        throw new Error('Nested value should be an object');
      }

      return assoc(value[0] || key, renameKeys(value[1], nestedObject), acc);
    } else {
      return assoc(value || key, obj[key], acc);
    }
  }, {})
);
