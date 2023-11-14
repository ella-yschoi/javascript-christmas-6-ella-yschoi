import { Console } from '@woowacourse/mission-utils';
import { ERROR } from './constants.js';

const printMessage = (message) => Console.print(message);

const readLineAsync = async (message) => (await Console.readLineAsync(message)).trim()

const throwError = (message) => {
  throw new Error(`${ERROR.prefix}${message}${ERROR.postfix}`);
};

export { printMessage, readLineAsync, throwError };
