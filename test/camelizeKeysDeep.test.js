import {expect} from 'chai';
import {camelizeKeysDeep} from '../src/transform-object';

describe('camelizeKeysDeep', () => {
  it('renames listed keys', () => {
    expect(camelizeKeysDeep(['user_name'], {user_name: 'John', user_age: 21})).to.eql({
      userName: 'John',
      user_age: 21
    });
  });

  it('renames nested keys', () => {
    expect(
      camelizeKeysDeep(['target_user'], {target_user: {target_name: 'John'}, user_age: 21})
    ).to.eql({targetUser: {targetName: 'John'}, user_age: 21});
  });

  it('does not camelizes not listed keys and their children', () => {
    expect(camelizeKeysDeep(['target_user'], {context: {content_type: 'application/pdf'}})).to.eql({
      context: {content_type: 'application/pdf'}
    });
  });
});
