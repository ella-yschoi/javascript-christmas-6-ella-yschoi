import { ERROR, EVENT } from '../common/constants.js';
import { isInRange, isNumeric } from '../common/validator.js';
import { throwError } from '../common/utils.js';

class EventDate {

  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = Number(date); 
  }

  getEventDate() {
    return this.#date; 
  }

  #validate(date) {
    this.#validateNumber(date);
    this.#validateRange(date);
  }

  
  #validateNumber(date) {
    if (!isNumeric(date)) {
      throwError(ERROR.date);
    }
  }

  #validateRange(date) {
    if (!isInRange(date, EVENT.min_date, EVENT.max_date)) {
      throwError(ERROR.date);
    }
  }
};

export default EventDate;
