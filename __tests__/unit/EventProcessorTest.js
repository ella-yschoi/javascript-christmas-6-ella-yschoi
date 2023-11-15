import EventProcessor from '../../src/service/EventProcessor.js';
import Menu from '../../src/model/Menu.js';
import EventDate from '../../src/model/EventDate.js';

describe('EventProcessor 기본 테스트', () => {
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

describe('EventProcessor 상세 테스트', () => {
  let eventProcessor;
  let orderDetails;
  let eventDate;

  beforeEach(() => {
    eventDate = new EventDate(3);
    orderDetails = [
      new Menu('티본스테이크', 1),
      new Menu('바비큐립', 1),
      new Menu('초코케이크', 2),
      new Menu('제로콜라', 1)
    ];
    eventProcessor = new EventProcessor(eventDate, orderDetails);
  });

  test('이벤트 플래너 항목 출력', () => {
    const result = eventProcessor.process();
    
    expect(result.pricing.totalAmountBeforeDiscount).toBe(142000);
    expect(result.bonuses.bonusMenu).toBe('샴페인 1개');
    expect(result.bonuses.benefitDetails).toContain('크리스마스 디데이 할인: -1,200원');
    expect(result.pricing.totalBenefit).toBe(31246);
    expect(result.pricing.finalPayAmount).toBe(135754);
    expect(result.bonuses.eventBadge).toBe('산타');
  });
});
