import { REGEX } from './constants.js';

const isNumeric = (input) => REGEX.positive_integer.test(input);

const isInRange = (input, min, max) => input >= min && input <= max;

export { isInRange, isNumeric };
