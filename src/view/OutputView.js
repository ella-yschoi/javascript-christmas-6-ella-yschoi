import { printMessage } from '../common/utils.js';
import { EVENT, OUTPUT, UTILS } from '../common/constants.js';

class OutputView {
  // 12월 N일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!
  static printPreview(date) {
    printMessage(OUTPUT.preview.replace('$date', date));
  };

  // <주문 메뉴>
  static printOrder(menuList) {
    const formattedMenuList = menuList.map(menu => `${menu.getName()} ${menu.getCount()}${EVENT.count}`).join('\n');
    printMessage(OUTPUT.order_menu.replace('$menuList', formattedMenuList));
  };  

  // <할인 전 총주문 금액>
  static printTotalOrderBeforeDiscount(totalAmount) {
    printMessage(OUTPUT.total_order_before_discount.replace('$totalAmount', totalAmount.toLocaleString()));
  };

  // <증정 메뉴>
  static printBonusMenu(bonusMenu) {
    printMessage(OUTPUT.bonus_Menu.replace('$bonusMenu', bonusMenu || OUTPUT.none));
  }

  // <혜택 내역>
  static printBenefitDetails(benefitDetails) {
    printMessage(OUTPUT.benefit_details.replace('$benefitDetails', benefitDetails));
  }; 

  // <총혜택 금액>
  static printTotalBenefit(totalBenefit) {
    printMessage(OUTPUT.total_benefit.replace('$totalBenefit', totalBenefit.toLocaleString()));
  };

  // <할인 후 예상 결제 금액>
  static printTotalPayAfterDiscount(finalAmount) {
    printMessage(OUTPUT.total_pay_after_discount.replace('$finalAmount', finalAmount.toLocaleString()));
  };

  // <12월 이벤트 배지>
  static printEventBadge(eventBadge) {
    printMessage(OUTPUT.event_badge.replace('$eventBadge', eventBadge));
  };
};

export default OutputView;
