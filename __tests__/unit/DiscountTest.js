import Discount from '../../src/model/Discount.js';
import { WEEKEND, WEEKDAY, SPECIAL_DISCOUNT } from '../../src/common/constants.js';

describe('Discount 테스트', () => {
  let discount;
  let mockDate;
  let mockOrderDetails;

  beforeEach(() => {
    mockDate = { getEventDate: () => 5 };
    mockOrderDetails = [{ getType: () => 'main', getCount: () => 2, getPrice: () => 10000 }];
    discount = new Discount(mockDate, mockOrderDetails);
  });

  test('주말 할인 적용', () => {
    mockDate.getEventDate = () => WEEKEND[0];
    discount.calculateTotalDiscount();
    expect(discount.getDiscount('weekend')).toBe(4046);
  });

  test('평일 할인 적용', () => {
    mockDate.getEventDate = () => WEEKDAY[0];
    discount.calculateTotalDiscount();
    expect(discount.getDiscount('weekday')).toBe(0);
  });

  test('특별 할인 적용', () => {
    mockDate.getEventDate = () => SPECIAL_DISCOUNT[0];
    discount.calculateTotalDiscount();
    expect(discount.getDiscount('special')).toBe(1000);
  });

  test('크리스마스 디데이 할인 적용', () => {
    mockDate.getEventDate = () => 25;
    discount.calculateTotalDiscount();
    expect(discount.getDiscount('christmas')).toBe(3400);
  });
});
