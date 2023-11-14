import { EVENT, SPECIAL_DISCOUNT, TYPE, WEEKDAY, WEEKEND } from '../common/constants.js';

class Discount {

  #totalDiscount;

  #specialDiscount;

  #weekendDiscount;

  #weekdayDiscount;

  #christmasDdayDiscount;

  #date;

  #orderDetails;

  constructor(amount, date, orderDetails) {
    this.#totalDiscount = 0;
    this.#date = date; 
    this.#orderDetails = orderDetails;
    this.#weekendDiscount = 0;
    this.#weekdayDiscount = 0;
  }

  calculateTotalDiscount() {
    this.#applyWeekendDiscount();
    this.#applyWeekdayDiscount();
    this.#applySpecialDiscount();
    this.#applyChristmasDdayDiscount();
  }

  getTotalDiscount() {
    return this.#totalDiscount;
  }

  getSpecialDiscount() {
    return this.#specialDiscount;
  }

  getWeekendDiscount() {
    return this.#weekendDiscount;
  }
  
  getWeekdayDiscount() {
    return this.#weekdayDiscount;
  }

  getChristmasDdayDiscount() {
    return this.#christmasDdayDiscount;
  }
  
  // 주말에는 메인 메뉴 1개당 2,023원 할인
  #applyWeekendDiscount() {
    if (WEEKEND.includes(this.#date.getEventDate())) {
      const mainMenus = this.#orderDetails.filter(menu => menu.getType() === TYPE.main);
      for (const menu of mainMenus) {
        this.#weekendDiscount += menu.getCount() * EVENT.weekend_discount;
      }
      this.#totalDiscount += this.#weekendDiscount;
    }
  }  

  // 평일에는 디저트 메뉴 1개당 2,023원 할인
  #applyWeekdayDiscount() {
    if (WEEKDAY.includes(this.#date.getEventDate())) {
      const dessertMenus = this.#orderDetails.filter(menu => menu.getType() === TYPE.dessert);
      for (const menu of dessertMenus) {
        this.#weekdayDiscount += menu.getCount() * EVENT.weekday_discount;
      }
      this.#totalDiscount += this.#weekdayDiscount;
    }
  }

  // 특별 할인: 달력에 별이 있는 날에는 총주문 금액에서 1,000원 특별 할인
  #applySpecialDiscount() {
    if (SPECIAL_DISCOUNT.includes(this.#date.getEventDate())) {
      this.#specialDiscount = EVENT.start_discount;
      this.#totalDiscount += this.#specialDiscount;
    }
  }

  // 크리스마스 디데이 할인
  #applyChristmasDdayDiscount() {
    const dayOfMonth = this.#date.getEventDate();
    if (dayOfMonth >= 1 && dayOfMonth <= 25) {
      this.#christmasDdayDiscount = EVENT.start_discount + EVENT.increase_discount * (dayOfMonth - 1);
      this.#totalDiscount += this.#christmasDdayDiscount;
    }
  }
};

export default Discount;
