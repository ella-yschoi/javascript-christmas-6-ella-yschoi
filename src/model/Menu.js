import { ERROR, EVENT, MENU } from '../common/constants.js';
import { throwError } from '../common/utils.js';

class Menu {

  #name;

  #count;

  #price;

  #type;

  constructor(name, count) {
    this.#validate(name, count);

    this.#name = name;
    this.#count = count;
    
    const menuInfo = MENU.find(item => item.name === name);
    this.#price = menuInfo ? menuInfo.price : 0;
    this.#type = menuInfo ? menuInfo.type : null;
  }

  getName() {
    return this.#name;
  }
  
  getPrice() {
    return this.#price;
  }

  getCount() {
    return this.#count;
  }
  
  getType() {
    return this.#type;
  }

  #validate(name, count) {
    this.#validateMenuExistence(name);
    this.#validateMenuCount(count);
  }

  #validateMenuExistence(name) {
    const validMenuName = new Set(MENU.map(item => item.name));
    if(!validMenuName.has(name)) {
      throwError(ERROR.order);
    }
    return name;
  }

  #validateMenuCount(count) {
    if(!Number.isInteger(count) || count <= EVENT.zero) {
      throwError(ERROR.order);
    }
    return count;
  }
};

export default Menu;
