import { EVENT, OUTPUT, SPECIAL_CHARACTERS } from '../common/constants.js';
import { printMessage } from '../common/utils.js';

class OutputView {
  
  static printPreview(date) {
    printMessage(OUTPUT.preview.replace('$date', date));
  };

  static printOrder(menuList) {
    const formattedMenuList = menuList.map(menu => `${menu.getName()} ${menu.getCount()}${EVENT.count}`).join('\n');
    printMessage(OUTPUT.order_menu.replace('$menuList', formattedMenuList));
  };  

  static printTotalOrderBeforeDiscount(totalAmount) {
    printMessage(OUTPUT.total_order_before_discount.replace('$totalAmount', totalAmount.toLocaleString()));
  };

  static printBonusMenu(bonusMenu) {
    printMessage(OUTPUT.bonus_Menu.replace('$bonusMenu', bonusMenu || OUTPUT.none));
  }

  static printBenefitDetails(benefitDetails) {
    printMessage(OUTPUT.benefit_details.replace('$benefitDetails', benefitDetails));
  }; 

  static printTotalBenefit(totalBenefit) {
    const formattedBenefit = totalBenefit === 0 
      ? totalBenefit.toLocaleString()
      : SPECIAL_CHARACTERS.hyphen + totalBenefit.toLocaleString();

    printMessage(OUTPUT.total_benefit.replace('$totalBenefit', formattedBenefit));
  }

  static printTotalPayAfterDiscount(finalAmount) {
    printMessage(OUTPUT.total_pay_after_discount.replace('$finalAmount', finalAmount.toLocaleString()));
  };

  static printEventBadge(eventBadge) {
    printMessage(OUTPUT.event_badge.replace('$eventBadge', eventBadge));
  };
};

export default OutputView;
