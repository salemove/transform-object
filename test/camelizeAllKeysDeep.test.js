import {expect} from 'chai';
import {camelizeAllKeysDeep} from '../src/transform-object';

describe('camelizeAllKeysDeep', () => {
  it('camelize one level deep objects', () => {
    const camelizeObj = {
      id: 'uuid',
      question_id: 'uuid',
      question_name: 'name',
      question_name_description: 'name description',
      question_one_two_three: 'one two three'
    };

    const expectedResponse = {
      id: 'uuid',
      questionId: 'uuid',
      questionName: 'name',
      questionNameDescription: 'name description',
      questionOneTwoThree: 'one two three'
    };

    expect(camelizeAllKeysDeep(camelizeObj)).to.eql(expectedResponse);
  });

  it('camelize two level deep objects', () => {
    const camelizeObj = {
      id: 'uuid',
      question_id: 'uuid',
      data: {
        question_name: 'name',
        question_name_description: 'name description',
        question_one_two_three: 'one two three'
      }
    };

    const expectedResponse = {
      id: 'uuid',
      questionId: 'uuid',
      data: {
        questionName: 'name',
        questionNameDescription: 'name description',
        questionOneTwoThree: 'one two three'
      }
    };

    expect(camelizeAllKeysDeep(camelizeObj)).to.eql(expectedResponse);
  });

  it('camelize three level deep objects', () => {
    const camelizeObj = {
      id: 'uuid',
      question_id: 'uuid',
      data: {
        question_name: {
          name_value: 'name value',
          name_description: 'name description'
        },
        question_one_two_three: 'one two three'
      }
    };

    const expectedResponse = {
      id: 'uuid',
      questionId: 'uuid',
      data: {
        questionName: {
          nameValue: 'name value',
          nameDescription: 'name description'
        },
        questionOneTwoThree: 'one two three'
      }
    };

    expect(camelizeAllKeysDeep(camelizeObj)).to.eql(expectedResponse);
  });
});
