import {expect} from 'chai';
import {camelizeAllKeys} from '../src/transform-object';

describe('camelizeAllKeys', () => {
  it('camelizes only first level of object keys', () => {
    const obj = {
      id: 'id',
      question_id: 'question-id',
      data: {
        question_name: 'name'
      }
    };

    const expectedResponse = {
      id: 'id',
      questionId: 'question-id',
      data: {
        question_name: 'name'
      }
    };

    expect(camelizeAllKeys(obj)).to.eql(expectedResponse);
  });
});
