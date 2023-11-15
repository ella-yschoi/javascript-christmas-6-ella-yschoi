import { ERROR, EVENT, REGEX, TYPE } from '../common/constants.js';

import { SPECIAL_CHARACTERS } from '../common/constants.js';
import { throwError } from '../common/utils.js';
import Menu from './Menu.js';

class Order {

  #menus;

  constructor(orderDetails) {
    this.#validateOrderDetails(orderDetails);
    this.#menus = this.#createMenusFromOrderString(orderDetails);
    this.#validateOrder();
  }

  getMenus() {
    return this.#menus;
  }

  #validateOrderDetails(orderDetailsString) {
    const orders = orderDetailsString.split(SPECIAL_CHARACTERS.comma);

    const isInvalidOrder = orders.some(order => {
      return !order.match(REGEX.menu_item_format);
    });

    if (isInvalidOrder) {
      throwError(ERROR.order);
    }
  }
  
  #isValidMenuName(menuName) {
    return menuName.match(REGEX.non_spaced_string);
  }
  
  #isValidMenuCount(menuCount) {
    return menuCount !== '' && !Number.isNaN(Number(menuCount));
  }

  #createMenusFromOrderString(orderDetailsString) {
    return orderDetailsString.split(SPECIAL_CHARACTERS.comma).map(item => {
      const [name, count] = item.split(SPECIAL_CHARACTERS.hyphen).map(str => str.trim());
      return new Menu(name, Number(count));
    });
  }

  #validateOrder() {
    this.#validateMenuDuplication();
    this.#validateDrinkOnlyOrder();
    this.#validateTotalMenuCount();
  }
  
  #validateMenuDuplication() {
    const menuNames = this.#menus.map(menu => menu.getName());
    const hasDuplicates = new Set(menuNames).size !== menuNames.length;
  
    if (hasDuplicates) {
      throwError(ERROR.order);
    }
    return menuNames;
  }

  #validateDrinkOnlyOrder() {
    const isDrinkOnly = this.#menus.every(menu => menu.getType() === TYPE.drink);
    if (isDrinkOnly) {
      throwError(ERROR.only_beverage);
    }
    return this.#menus;
  }

  #validateTotalMenuCount() {
    const totalCount = this.#menus.reduce((sum, menu) => sum + menu.getCount(), 0);
    if (totalCount > EVENT.max_order) {
      throwError(ERROR.order_over);
    }
    return totalCount;
  }
};

export default Order;
