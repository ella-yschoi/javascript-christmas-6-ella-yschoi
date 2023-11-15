import { BADGES, OUTPUT } from '../common/constants.js';

class Badge {

  #totalBenefit;

  constructor(totalBenefit) {
    this.#totalBenefit = totalBenefit;
  }

  assignBadge() {
    for (const { badge, amount } of BADGES) {
      if (this.#totalBenefit >= amount) {
        return badge;
      }
    }
    return OUTPUT.none;
  }
};

export default Badge;
