import { INPUT } from '../common/constants.js';
import { readLineAsync } from '../common/utils.js';

class InputView {
  static async getEventDate() { 
    return readLineAsync(INPUT.event_date);
  }

  static async getOrderDetails() {
    return readLineAsync(INPUT.menu_count);
  }
};

export default InputView;
