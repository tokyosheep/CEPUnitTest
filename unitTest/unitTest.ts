
import report from '../log/log';

/*
is the value Object or not
*/
const isObject = (value) => {
  return value !== null && typeof value === 'object';
};

/*
comparing all of property of object
whether is equal or not
*/
const isEqualObject = (anyObject, comparableObject) => {
  return Object.entries(anyObject).every(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(comparableObject, key) && isObject(value) && isObject(comparableObject[key])) {
      return isEqualObject(value, comparableObject[key]);
    }
    return value === comparableObject[key];
  });
};

/**
 *  Test class
 *  each method can recieve argments
 *  and circulating all of args 
 */
export class Test {
  isSkip:boolean;
  func: Function;
  isEach: boolean;
  eachArg: unknown[];
  constructor (description, func:Function) {
    this.isSkip = false;
    this.isEach = false;
    this.func = func;
    report.log('test');
    report.log(description);
  }

  /**
   * skip the test
   * @returns @type {this}
   */
  skip () {
    this.isSkip = true;
    return this;
  }

  /**
   * doing actual test
   * @returns @type {this}
   */
  testing () {
    if(this.isSkip) return;
    if(this.isEach) {
      this.eachArg.forEach((arg, index) => {
        report.log(`testing number of ${index}`);
        this.func(arg);
      })
    } else {
      this.func();
    }
  }

  /**
   * 
   * @param arg @type {unknown[]} 
   * @returns @type {this}
   */
  setEach(arg:unknown[]) {
    this.eachArg = arg;
    this.isEach = true;
    return this;
  }
}

/*
I think I don't need it any more
export const test = <T extends Function>(declation:string, func:T, isSkip:boolean = false) => {
  if (isSkip) return;
  report.log('test');
  report.log(declation);
  func();
};
*/

/**
 * Result class
 * validate the result that was you expected or not
 */
export class Result {
  func:Function|null;
  value: unknown|null;
  static _beforeFunc:Function|null = null;
  static _doBefore:boolean = false;
  static _doAfter:boolean = false;
  static _afterFunc:Function|null = null;

  /**
   * something call function before test
   * @param func @type {Function} 
   */
  static eachBefore (func:Function) {
    this._doBefore = true;
    this._beforeFunc = func;
  }

  /**
   * something call function after test
   * @param func @type {Function} 
   */
  static eachAfter (func:Function) {
    this._doAfter = true;
    this._afterFunc = func;
  }

  /**
   * reset the function status
   * it stopps call function both after and before
   */
  static resetEachFunc () {
    this._doAfter = false;
    this._doBefore = false;
  }

  constructor () {
    this.value = null;
    report.log(Result._doBefore);
    if(Result._doBefore) Result._beforeFunc();
  }

  /**
   * 
   * @param {unknown} n 
   * @returns @type {this} the class itsels
   */
  expect (n) {
    this.value = n;
    if(Result._doAfter) Result._afterFunc();
    return this;
  }

  /**
   * just showing result without validating result value
   */
  showResult () {
    report.log(this.value);
  }

  /**
   * 
   * @param resultOfBooelan @type {boolean} result it was success or not
   * @param initValue @type {unknown} result of actual value
   * @param expectation @type {unknown} the value you expected
   */
  callResult (resultOfBooelan:boolean,initValue?:unknown, expectation?:unknown):void  {
    if (resultOfBooelan) {
      report.log('---- test was succeeded ----')
    } else {
      report.log('---- failed the test. the value was unexpected ----');
      if (initValue !== undefined && expectation !== undefined ) report.log(`it was expected ${expectation} but value was ${initValue}`);
    }
  }

  /**
   * is it truthy or not
   */
  tobeTruthy () {
    this.callResult(!!this.value === true);
  }
  /**
   * is it falsy or not
   */
  tobeFalsy () {
    this.callResult(!!this.value === false);
  }
  /**
   * was the value you expected exactly or not
   * @param n @type {unknown} 
   */
  toBe (n:unknown) {
    this.callResult(this.value === n, this.value, n);
  }
  /**
   * comparing objects
   * not refering.
   * it inspects the Objects have same properties or not
   * @param comparableObject @type {Object}
   */
  toEqual (comparableObject:Object) {
    this.callResult(isEqualObject(this.value, comparableObject));
  }
};