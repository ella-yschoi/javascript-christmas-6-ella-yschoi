import EventDate from '../../src/model/EventDate.js';
import { ERROR } from '../../src/common/constants.js';

describe('EventDate 테스트', () => {
  let eventDate;

  beforeEach(() => {
    eventDate = new EventDate(15);
  });

  test('유효한 날짜에 대해 인스턴스 생성', () => {
    expect(eventDate.getEventDate()).toBe(15);
  });

  test.each([0, 32, 'a', undefined])('유효하지 않은 날짜 %s에 대해 예외 발생', (invalidDate) => {
    expect(() => new EventDate(invalidDate)).toThrow(ERROR.date);
  });
});
