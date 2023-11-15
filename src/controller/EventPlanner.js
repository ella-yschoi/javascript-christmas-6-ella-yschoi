import { printMessage } from '../common/utils.js';
import EventDate from '../model/EventDate.js';
import Order from '../model/Order.js';
import EventProcessor from '../service/EventProcessor.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class EventPlanner {
  
  /**
   * 이벤트 처리 및 계산된 결과 출력
   * @returns {Promise<void>} - 처리 결과를 출력하는 Promise
   */
  async manageEvent() {
    const eventProcessor = await this.#initEventProcessor(); // 사용자 input 받고 준비
  
    if (eventProcessor) {
      // EventPlanner가 직접 계산하지 않고, 계산 (비즈니스 로직)은 service layer의 EventProcessor에 위임
      // 그 결과 값만 사용
      const eventProcessingResult = eventProcessor.process(); 

      // 계산된 결과 출력
      this.#printResult(eventProcessingResult); 
    } 
  }

  /**
   * EventProcessor 인스턴스 초기화
   * @returns {Promise<EventProcessor|null>} - 초기화된 EventProcessor 인스턴스 또는 null
   */
  async #initEventProcessor() {
    const eventDate = await this.#getEventDate();
    const orderDetails = await this.#getOrderDetails();

    if (!eventDate || !orderDetails) {
      return null;
    }

    return new EventProcessor(eventDate, orderDetails);
  }

  /**
   * 사용자 입력으로부터 이벤트 날짜 받기
   * @returns {Promise<EventDate|null>} - 받아온 날짜를 기반으로 생성한 EventDate 인스턴스 또는 null
   */
  async #getEventDate() {
    try {
      return new EventDate(await InputView.getEventDate());
    } catch (error) {
      printMessage(error.message);
      return await this.#getEventDate();
    }
  }

  /**
   * 사용자 입력으로부터 주문 상세 정보를 받기
   * @returns {Promise<Array<Order>>} - 주문 상세 정보 배열
   */
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

  /**
   * 계산된 이벤트 결과 출력
   * @param {Object} result - 처리된 이벤트 데이터
   */
  #printResult(result) {
    OutputView.printPreview(result.eventDate);
    OutputView.printOrder(result.orderDetails);
    OutputView.printTotalOrderBeforeDiscount(result.pricing.totalAmountBeforeDiscount);
    OutputView.printBonusMenu(result.bonuses.bonusMenu);
    OutputView.printBenefitDetails(result.bonuses.benefitDetails);
    OutputView.printTotalBenefit(result.pricing.totalBenefit);
    OutputView.printTotalPayAfterDiscount(result.pricing.finalPayAmount);
    OutputView.printEventSummary(result.bonuses.eventBadge, result.isEligibleForBenefit);
  }
}

export default EventPlanner;
