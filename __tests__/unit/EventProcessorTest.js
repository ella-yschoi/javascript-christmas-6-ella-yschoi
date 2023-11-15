import EventProcessor from '../../src/service/EventProcessor.js';
import Menu from '../../src/model/Menu.js';
import EventDate from '../../src/model/EventDate.js';

describe('EventProcessor 테스트', () => {
  let eventProcessor;
  let orderDetails;
  let eventDate;

  beforeEach(() => {
    eventDate = new EventDate(15);
    orderDetails = [
      new Menu('해산물파스타', 2),
      new Menu('초코케이크', 1)
    ];
    eventProcessor = new EventProcessor(eventDate, orderDetails);
  });

  test('할인 전 총주문 금액 계산', () => {
    const result = eventProcessor.process();
    expect(result.pricing.totalAmountBeforeDiscount).toBeGreaterThan(0);
  });

  test('증정 메뉴 생성', () => {
    const result = eventProcessor.process();
    expect(result.bonuses.bonusMenu).toBeDefined();
  })

  test('혜택 내역 생성', () => {
    const result = eventProcessor.process();
    expect(result.bonuses.benefitDetails).toBeDefined();
  });

  test('총혜택 금액 계산', () => {
    const result = eventProcessor.process();
    expect(result.pricing.totalBenefit).toBeGreaterThanOrEqual(0);
  });

  test('할인 후 예상 결제 금액 계산', () => {
    const result = eventProcessor.process();
    expect(result.pricing.finalPayAmount).toBeLessThanOrEqual(result.pricing.totalAmountBeforeDiscount);
  });

  test('12월 이벤트 배지 생성', () => {
    const result = eventProcessor.process();
    expect(result.bonuses.eventBadge).toBeDefined();
  });
});
