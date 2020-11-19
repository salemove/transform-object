import {expect} from 'chai';
import {snakifyAllKeys} from '../src/transform-object';

describe('snakifyAllKeys', () => {
  it('snakifies only first level of object keys', () => {
    const obj = {
      id: 'id',
      questionId: 'question-id',
      data: {
        questionName: 'name'
      }
    };

    const expectedResponse = {
      id: 'id',
      question_id: 'question-id',
      data: {
        questionName: 'name'
      }
    };

    expect(snakifyAllKeys(obj)).to.eql(expectedResponse);
  });
});
