const EVENT = Object.freeze({
  min_date: 1,
  max_date: 31,
  min_dDay_discount: 2,
  max_dDay_discount: 25,
  max_order: 20,
  start_discount: 1_000,
  increase_discount: 100,
  weekend_discount: 2_023,
  weekday_discount: 2_023,
  bonus_amount: 120_000,
  bonus_price: 25_000,
  count: '개',
  won: '원',
  zero: 0,
});

const WEEKDAY = Object.freeze([
  3, 4, 5, 6, 7,
  10, 11, 12, 13, 14,
  17, 18, 19, 20, 21,
  24, 25, 26, 27, 28,
  31,
]);

const WEEKEND = Object.freeze([
  1, 2, 8, 9, 15, 16, 22, 23, 29, 30
]);

const SPECIAL_DISCOUNT = Object.freeze([
  3, 10, 17, 24, 25, 31
]);

const REGEX = Object.freeze({
  positive_integer: /^[1-9]\d*$/,
  non_spaced_string: /^\S+$/,
  menu_item_format: /^\S+-\d+$/,
});

const SPECIAL_CHARACTERS = Object.freeze({
  comma: ',',
  hyphen: '-',
});

const BADGES = Object.freeze([
  { badge: '산타', amount: 20_000 },
  { badge: '트리', amount: 10_000 },
  { badge: '별', amount: 5_000 },
]);

const INPUT = Object.freeze({
  event_date: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menu_count: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

const DISCOUNT = Object.freeze({
  christmas: '크리스마스 디데이 할인',
  weekday: '평일 할인',
  weekend: '주말 할인',
  special: '특별 할인',
  bonus: '증정 이벤트: -25,000원',
});

const OUTPUT = Object.freeze({
  preview: `12월 $date일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  order_menu: `\n<주문 메뉴>\n$menuList`,
  total_order_before_discount: `\n<할인 전 총주문 금액>\n$totalAmount원`,
  bonus_Menu: `\n<증정 메뉴>\n$bonusMenu`, 
  benefit_details: `\n<혜택 내역>\n$benefitDetails`,
  total_benefit: `\n<총혜택 금액>\n$totalBenefit원`,
  total_pay_after_discount: `\n<할인 후 예상 결제 금액>\n$finalAmount원`,
  event_badge: `\n<12월 이벤트 배지>\n$eventBadge`,
  none: '없음',
});

const ERROR = Object.freeze({
  prefix: '[ERROR] ',
  postfix: '다시 입력해 주세요.',
  date: '유효하지 않은 날짜입니다. ',
  order: '유효하지 않은 주문입니다. ',
  order_over: '메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. ',
  only_beverage: '음료만 주문 시, 주문할 수 없습니다. ',
  total_over: '총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.',
});

const TYPE = Object.freeze({
  appetizer: 'appetizer',
  main: 'main',
  dessert: 'dessert',
  drink: 'drink',
  gift: '샴페인 1개'
});

const MENU = Object.freeze([
  { name: '양송이수프', price: 6_000, type: TYPE.appetizer },
  { name: '타파스', price: 5_500, type: TYPE.appetizer },
  { name: '시저샐러드', price: 8_000, type: TYPE.appetizer },

  { name: '티본스테이크', price: 55_000, type: TYPE.main },
  { name: '바비큐립', price: 54_000, type: TYPE.main },
  { name: '해산물파스타', price: 35_000, type: TYPE.main },
  { name: '크리스마스파스타', price: 25_000, type: TYPE.main },

  { name: '초코케이크', price: 15_000, type: TYPE.dessert },
  { name: '아이스크림', price: 5_000, type: TYPE.dessert },

  { name: '제로콜라', price: 3_000, type: TYPE.drink },
  { name: '레드와인', price: 60_000, type: TYPE.drink },
  { name: '샴페인', price: 25_000, type: TYPE.drink },
]);

export { BADGES, DISCOUNT, ERROR, EVENT, INPUT, MENU, OUTPUT, REGEX, SPECIAL_CHARACTERS, SPECIAL_DISCOUNT, TYPE, WEEKDAY, WEEKEND };

