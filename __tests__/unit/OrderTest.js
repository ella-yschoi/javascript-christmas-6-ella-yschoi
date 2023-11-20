import Order from '../../src/model/Order.js';

describe('Order 클래스', () => {
  let order;
  let mockOrderDetails;

  beforeEach(() => {
    mockOrderDetails = '해산물파스타-2,레드와인-1';
    order = new Order(mockOrderDetails);
  });

  test('메뉴 중복 검사', () => {
    expect(() => new Order('해산물파스타-2,해산물파스타-1')).toThrow();
  });

  test('음료만 주문 시 검사', () => {
    expect(() => new Order('콜라-1,사이다-1')).toThrow();
  });

  test('메뉴 개수 검사', () => {
    expect(order.getMenus().length).toBe(2);
  });
});
