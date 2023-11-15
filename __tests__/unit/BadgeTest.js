import Badge from '../../src/model/Badge.js';
import { BADGES, OUTPUT } from '../../src/common/constants.js';

describe('Badge 테스트', () => {
  test.each(BADGES)('총혜택 금액 최소 %d원 이상이면 %s 배지 부여', ({ badge, amount }) => {
    const badgeInstance = new Badge(amount);
    expect(badgeInstance.assignBadge()).toBe(badge);
  });

  test('총혜택 금액 5000원 미만이면 배지 없음', () => {
    const badgeInstance = new Badge(4999);
    expect(badgeInstance.assignBadge()).toBe(OUTPUT.none);
  });
});
