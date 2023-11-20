import { EVENT, SPECIAL_DISCOUNT, TYPE, WEEKDAY, WEEKEND } from '../common/constants.js';

class Discount {

  #date;

  #orderDetails;
  
  #discounts;

  constructor(date, orderDetails) {
    this.#date = date; 
    this.#orderDetails = orderDetails;
    this.#discounts = {
      special: 0,
      weekend: 0,
      weekday: 0,
      christmas: 0,
    };
  }

  calculateTotalDiscount() {
    this.#applyWeekendDiscount();
    this.#applyWeekdayDiscount();
    this.#applySpecialDiscount();
    this.#applyChristmasDdayDiscount();
  }

  getTotalDiscount() {
    return Object.values(this.#discounts).reduce((sum, value) => sum + value, 0);
  }

  getDiscount(type) {
    return this.#discounts[type];
  }

  #applyWeekendDiscount() {
    if (WEEKEND.includes(this.#date.getEventDate())) {
      const mainMenus = this.#orderDetails.filter(menu => menu.getType() === TYPE.main);
      for (const menu of mainMenus) {
        this.#discounts.weekend += menu.getCount() * EVENT.weekend_discount;
      }
    }
  }  

  #applyWeekdayDiscount() {
    if (WEEKDAY.includes(this.#date.getEventDate())) {
      const dessertMenus = this.#orderDetails.filter(menu => menu.getType() === TYPE.dessert);
      for (const menu of dessertMenus) {
        this.#discounts.weekday += menu.getCount() * EVENT.weekday_discount;
      }
    }
  }

  #applySpecialDiscount() {
    if (SPECIAL_DISCOUNT.includes(this.#date.getEventDate())) {
      this.#discounts.special = EVENT.start_discount;
    }
  }

  #applyChristmasDdayDiscount() {
    const dayOfMonth = this.#date.getEventDate();
    if (dayOfMonth >= 1 && dayOfMonth <= 25) {
      this.#discounts.christmas = EVENT.start_discount + EVENT.increase_discount * (dayOfMonth - 1);
    }
  }
};

export default Discount;
