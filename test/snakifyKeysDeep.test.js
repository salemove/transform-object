import {expect} from 'chai';
import {snakifyKeysDeep} from '../src/transform-object';

describe('snakifyKeysDeep', () => {
  it('renames listed keys', () => {
    expect(snakifyKeysDeep(['userName'], {userName: 'John', userAge: 21})).to.eql({
      user_name: 'John',
      userAge: 21
    });
  });

  it('renames nested keys', () => {
    expect(snakifyKeysDeep(['targetUser'], {targetUser: {targetName: 'John'}, userAge: 21})).to.eql({
      target_user: {target_name: 'John'},
      userAge: 21
    });
  });

  it('does not camelizes not listed keys and their children', () => {
    expect(snakifyKeysDeep(['targetUser'], {context: {contentType: 'application/pdf'}})).to.eql({
      context: {contentType: 'application/pdf'}
    });
  });
});
