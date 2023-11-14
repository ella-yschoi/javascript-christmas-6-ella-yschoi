import { TYPE, ERROR, EVENT } from '../common/constants.js';
import { throwError } from '../common/utils.js';

class Order {

  #menus;

  constructor(menus) {
    this.#menus = menus;
    this.validate();
  }

  validate() {
    this.validateMenuDuplication();
    this.validateDrinkOnlyOrder();
    this.validateTotalMenuCount();
  }

  validateMenuDuplication() {
    const menuNames = this.#menus.map(menu => menu.getName());
    const hasDuplicates = new Set(menuNames).size !== menuNames.length;
  
    if (hasDuplicates) {
      throwError(ERROR.order);
    }
    return menuNames;
  }

  validateDrinkOnlyOrder() {
    const isOnlyDrink = this.#menus.every(menu => menu.getType() === TYPE.drink);
  
    if (isOnlyDrink) {
      throwError(ERROR.order);
    }
    return this.#menus;
  }

  validateTotalMenuCount() {
    const totalCount = this.#menus.reduce((sum, menu) => sum + menu.getCount(), 0);
    if (totalCount > EVENT.max_order) {
      throwError(ERROR.order);
    }
    return totalCount;
  }
};

export default Order;
