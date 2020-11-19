import {expect} from 'chai';
import {snakifyKeys} from '../src/transform-object';

describe('snakifyKeys', () => {
  it('renames listed keys', () => {
    expect(snakifyKeys(['userName'], {userName: 'John', userAge: 21})).to.eql({
      user_name: 'John',
      userAge: 21
    });
  });

  it('renames nested keys', () => {
    expect(snakifyKeys(['targetUser'], {targetUser: {targetName: 'John'}, userAge: 21})).to.eql({
      target_user: {target_name: 'John'},
      userAge: 21
    });
  });

  it('does not camelizes not listed keys and their children', () => {
    expect(snakifyKeys(['targetUser'], {context: {contentType: 'application/pdf'}})).to.eql({
      context: {contentType: 'application/pdf'}
    });
  });
});
