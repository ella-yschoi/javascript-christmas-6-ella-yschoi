import { UTILS } from './constants.js';

const isNumeric = (input) => UTILS.positive_integer.test(input);

const isInRange = (input, min, max) => input >= min && input <= max;

export { isInRange, isNumeric };
