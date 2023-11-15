import { SPECIAL_CHARACTERS } from '../common/constants.js';
import { printMessage } from '../common/utils.js';
import EventDate from '../model/EventDate.js';
import Menu from '../model/Menu.js';
import Order from '../model/Order.js';
import EventProcessor from '../service/EventProcessor.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class EventPlanner {
  
  async manageEvent() {
    const eventProcessor = await this.#initEventProcessor();
  
    if (eventProcessor) {
      const eventProcessingResult = eventProcessor.process(); 
      this.#printResult(eventProcessingResult); 
    } 
  }

  async #initEventProcessor() {
    const eventDate = await this.#getEventDate();
    const orderDetails = await this.#getOrderDetails();

    if (!eventDate || !orderDetails) {
      return null;
    }

    return new EventProcessor(eventDate, orderDetails);
  }

  async #getEventDate() {
    try {
      return new EventDate(await InputView.getEventDate());
    } catch (error) {
      printMessage(error.message);
      return await this.#getEventDate();
    }
  }

  async #getOrderDetails() {
    try {
      const rawOrderDetails = await InputView.getOrderDetails();
      const order = new Order(rawOrderDetails);
      return order.getMenus();
    } catch (error) {
      printMessage(error.message);
      return await this.#getOrderDetails();
    }
  }

  #processOrderDetails(rawOrderDetails) {
    return rawOrderDetails.split(SPECIAL_CHARACTERS.comma).map((item) => {
      const [name, count] = item.split(SPECIAL_CHARACTERS.hyphen).map((str) => str.trim());
      return new Menu(name, Number(count));
    });
  }

  #printResult(result) {
    OutputView.printPreview(result.eventDate);
    OutputView.printOrder(result.orderDetails);
    OutputView.printTotalOrderBeforeDiscount(result.pricing.totalAmountBeforeDiscount);
    OutputView.printBonusMenu(result.bonuses.bonusMenu);
    OutputView.printBenefitDetails(result.bonuses.benefitDetails);
    OutputView.printTotalBenefit(result.pricing.totalBenefit);
    OutputView.printTotalPayAfterDiscount(result.pricing.finalPayAmount);
    OutputView.printEventBadge(result.bonuses.eventBadge);
  }
}

export default EventPlanner;
