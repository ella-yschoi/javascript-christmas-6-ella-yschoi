import { DISCOUNT, EVENT, OUTPUT, SPECIAL_CHARACTERS, TYPE } from '../common/constants.js';

import Badge from '../model/Badge.js';
import Discount from '../model/Discount.js';

class EventProcessor {
  
  #eventDate;
  #orderDetails = [];
  #discounts;
  #totalAmountBeforeDiscount;

  constructor(eventDate, orderDetails) {
    this.#eventDate = eventDate;
    this.#orderDetails = orderDetails;
  }

  process() {
    this.#calculateTotalAmountBeforeDiscount();
    this.#calculateDiscount();
  
    const orderDetails = this.#orderDetails;
    const totalAmountBeforeDiscount = this.#totalAmountBeforeDiscount;
    const isEligibleForBenefit = totalAmountBeforeDiscount >= EVENT.standard;
    const pricing = this.#calculatePricing(totalAmountBeforeDiscount, isEligibleForBenefit);
    const bonuses = this.#calculateBonuses(isEligibleForBenefit);
  
    return {
      eventDate: this.#eventDate.getEventDate(),
      orderDetails,
      isEligibleForBenefit: isEligibleForBenefit,
      pricing,
      bonuses,
    };
  }
  
  #calculatePricing(totalAmountBeforeDiscount, isEligibleForBenefit) {
    const pricing = {
      totalAmountBeforeDiscount,
      totalBenefit: EVENT.zero,
      finalPayAmount: totalAmountBeforeDiscount,
    };
  
    if (isEligibleForBenefit) {
      pricing.totalBenefit = this.#calculateTotalBenefit();
      pricing.finalPayAmount = this.#calculateTotalPayAfterDiscount();
    }
  
    return pricing;
  }
  
  #calculateBonuses(isEligibleForBenefit) {
    const bonuses = {
      eventBadge: OUTPUT.none,
      bonusMenu: OUTPUT.none,
      benefitDetails: OUTPUT.none,
    };
  
    if (isEligibleForBenefit) {
      bonuses.eventBadge = this.#generateEventBadge();
      bonuses.bonusMenu = this.#generateBonusMenu();
      bonuses.benefitDetails = this.#generateBenefitDetails();
    }

    return bonuses;
  }
  

  #calculateTotalAmountBeforeDiscount() {
    this.#totalAmountBeforeDiscount = this.#orderDetails.reduce((total, menu) => {
      return total + menu.getPrice() * menu.getCount();
    }, 0);
  }

  #calculateDiscount() {
    this.#discounts = new Discount(this.#eventDate, this.#orderDetails);
    this.#discounts.calculateTotalDiscount();
  }

  #calculateTotalBenefit() {
    let totalBenefit = this.#discounts.getTotalDiscount();
    if (this.#totalAmountBeforeDiscount >= EVENT.bonus_amount) {
      totalBenefit += EVENT.bonus_price;
    }
    return totalBenefit;
  }

  #calculateTotalPayAfterDiscount() {
    return this.#totalAmountBeforeDiscount - this.#discounts.getTotalDiscount();
  }

  #generateEventBadge() {
    let totalBenefit = this.#discounts.getTotalDiscount();
    if (this.#totalAmountBeforeDiscount >= EVENT.bonus_amount) {
      totalBenefit += EVENT.bonus_price;
    }
    const badge = new Badge(totalBenefit);
    return badge.assignBadge();
  }

  #generateBonusMenu() {
    return this.#totalAmountBeforeDiscount >= EVENT.bonus_amount ? TYPE.gift : '';
  }

  #generateBenefitDetails() {
    const discounts = {
      [DISCOUNT.christmas]: this.#discounts.getDiscount('christmas'),
      [DISCOUNT.weekday]: this.#discounts.getDiscount('weekday'),
      [DISCOUNT.weekend]: this.#discounts.getDiscount('weekend'),
      [DISCOUNT.special]: this.#discounts.getDiscount('special'),
    };

    const benefitDetails = Object.entries(discounts)
      .filter(([, value]) => value > EVENT.zero)
      .map(([key, value]) => `${key}: ${SPECIAL_CHARACTERS.hyphen}${value.toLocaleString()}${EVENT.won}`)
      .join('\n');

    if (this.#totalAmountBeforeDiscount >= EVENT.bonus_amount) {
      const champagneBonus = DISCOUNT.bonus;
      return `${benefitDetails}\n${champagneBonus}`;
    }

    return benefitDetails || OUTPUT.none;
  }
}

export default EventProcessor;
