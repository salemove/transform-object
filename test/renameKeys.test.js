import {expect} from 'chai';
import {renameKeys} from '../src/transform-object';

describe('renameKeys', () => {
  it('renames object keys', () => expect(renameKeys({b: 'a'}, {b: 1})).to.eql({a: 1}));

  it('renames nested object keys', () =>
    expect(renameKeys({b: ['a', {c: 'd'}]}, {b: {c: 1}})).to.eql({a: {d: 1}}));

  it('throws exception when nested value is not an object', () =>
    expect(() => renameKeys({b: ['a', {c: 'd'}]}, {b: 1})).to.throw(
      'Nested value should be an object'
    ));
});
