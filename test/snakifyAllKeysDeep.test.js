import {expect} from 'chai';
import {snakifyAllKeysDeep} from '../src/transform-object';

describe('snakifyAllKeysDeep', () => {
  it('snake case one level deep objects', () => {
    const snakeCaseObj = {
      id: 'uuid',
      questionId: 'uuid',
      questionName: 'name',
      questionNameDescription: 'name description',
      questionOneTwoThree: 'one two three'
    };

    const expectedResponse = {
      id: 'uuid',
      question_id: 'uuid',
      question_name: 'name',
      question_name_description: 'name description',
      question_one_two_three: 'one two three'
    };

    expect(snakifyAllKeysDeep(snakeCaseObj)).to.eql(expectedResponse);
  });

  it('snake case two level deep objects', () => {
    const snakeCaseObj = {
      id: 'uuid',
      questionId: 'uuid',
      data: {
        questionName: 'name',
        questionNameDescription: 'name description',
        questionOneTwoThree: 'one two three'
      }
    };

    const expectedResponse = {
      id: 'uuid',
      question_id: 'uuid',
      data: {
        question_name: 'name',
        question_name_description: 'name description',
        question_one_two_three: 'one two three'
      }
    };

    expect(snakifyAllKeysDeep(snakeCaseObj)).to.eql(expectedResponse);
  });

  it('snake case three level deep objects', () => {
    const snakeCaseObj = {
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

    const expectedResponse = {
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

    expect(snakifyAllKeysDeep(snakeCaseObj)).to.eql(expectedResponse);
  });
});
