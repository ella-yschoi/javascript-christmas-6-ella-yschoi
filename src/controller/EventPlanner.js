import { printMessage } from '../common/utils.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import EventDate from '../model/EventDate.js';
import Menu from '../model/Menu.js';
import Discount from '../model/Discount.js';
import { UTILS, OUTPUT, EVENT, DISCOUNT, TYPE } from '../common/constants.js';
import Badge from '../model/Badge.js';

class EventPlanner {

  #eventDate;

  #orderDetails = []; // 주문된 메뉴의 세부 정보를 배열로 저장

  #discount;

  #totalAmountBeforeDiscount;

  #badge;

  async printPreview() { 
    await this.#initPreview();
    this.#runPreview();
  }

  async #initPreview() {
    await this.#getEventDate();
    await this.#getOrderDetails();
  }

  async #getEventDate() {
    try {
      this.#eventDate = new EventDate(await InputView.getEventDate());
    } catch (error) {
      printMessage(error.message);
      await this.#getEventDate();
    }
  }

  async #getOrderDetails() {
    try {
      const rawOrderDetails = await InputView.getOrderDetails();
      const orderItems = rawOrderDetails.split(UTILS.comma)
        .map(item => {
          // TODO: 아래 두 코드를 검증하는 로직이 필요하고, 그건 지금 Menu안에 있음 (#validateMenuFormat())
          const [name, countStr] = item.split(UTILS.hyphen);
          const count = Number(countStr);
          return new Menu(name.trim(), count);
        });
      this.#orderDetails.push(...orderItems);
    } catch (error) {
      printMessage(error.message);
      await this.#getOrderDetails();
    }
  }

  async #runPreview() {
    this.#printOrder(); // <주문 메뉴>
    this.#totalOrderBeforeDiscount(); // <할인 전 총주문 금액>
    this.#calculateDiscount(); // <총혜택 금액> 및 할인 객체 초기화
    this.#bonusMenu(); // <증정 메뉴>
    this.#benefitDetails(); // <혜택 내역>
    this.#totalPayAfterDiscount(); // <할인 후 예상 결제 금액>
    this.#eventBadge(); // <12월 이벤트 배지>
  }

  // <주문 메뉴>
  #printOrder() {
    OutputView.printOrder(this.#orderDetails);
  }

  // <할인 전 총주문 금액>
  #totalOrderBeforeDiscount() {
    this.#totalAmountBeforeDiscount = 0;
    this.#orderDetails.forEach(menu => {
      this.#totalAmountBeforeDiscount += menu.getPrice() * menu.getCount();
    });
    OutputView.printTotalOrderBeforeDiscount(this.#totalAmountBeforeDiscount);
  }

  // <증정 메뉴>
  #bonusMenu() {
    let bonusMenu = '';
    if (this.#totalAmountBeforeDiscount >= EVENT.bonus_amount) {
      bonusMenu = TYPE.gift;
    }
    OutputView.printBonusMenu(bonusMenu);
  }

  // <혜택 내역>
  // TODO: 각 discount 필드를 하나의 배열로 묶어 관리
  #benefitDetails() {
    const discounts = {
      [DISCOUNT.christmas]: this.#discount.getChristmasDdayDiscount(),
      [DISCOUNT.weekday]: this.#discount.getWeekdayDiscount(),
      [DISCOUNT.weekend]: this.#discount.getWeekendDiscount(),
      [DISCOUNT.special]: this.#discount.getSpecialDiscount()
    };

    let benefitDetails = Object.entries(discounts)
      .filter(([_, value]) => value > UTILS.zero)
      .map(([key, value]) => `${key}: ${UTILS.hyphen}${value.toLocaleString()}${EVENT.won}`)
      .join('\n');

    if (this.#totalAmountBeforeDiscount >= EVENT.bonus_amount) {
      const champagneBonus = DISCOUNT.bonus;
      benefitDetails = `${champagneBonus}\n${benefitDetails}`;
    }

    OutputView.printBenefitDetails(benefitDetails || OUTPUT.none);
  }

  // <총혜택 금액> = 할인 금액의 합계 + 증정 메뉴의 가격
  #calculateDiscount() {
    this.#discount = new Discount(this.#totalAmountBeforeDiscount, this.#eventDate, this.#orderDetails); 
    this.#discount.calculateTotalDiscount();

    let totalBenefit = this.#discount.getTotalDiscount();
    if (this.#totalAmountBeforeDiscount >= EVENT.bonus_amount) {
      totalBenefit += 25000;
    }

    OutputView.printTotalBenefit(totalBenefit);
  }

  // <할인 후 예상 결제 금액> = #totalAmountBeforeDiscount - 총 할인 금액 (샴페인 제외)
  #totalPayAfterDiscount() {
    const finalPayAmount = this.#totalAmountBeforeDiscount - this.#discount.getTotalDiscount();
    OutputView.printTotalPayAfterDiscount(finalPayAmount);
  }

  // <12월 이벤트 배지>
  #eventBadge(totalBenefit){
    const badge = new Badge(totalBenefit)
    const createdBadge = badge.assignBadge();
    OutputView.printEventBadge(createdBadge);
  }
};

export default EventPlanner;
