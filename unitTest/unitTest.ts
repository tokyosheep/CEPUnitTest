
import report from '../log/log';

const isObject = (value) => {
  return value !== null && typeof value === 'object';
};

const isEqualObject = (anyObject, comparableObject) => {
  return Object.entries(anyObject).every(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(comparableObject, key) && isObject(value) && isObject(comparableObject[key])) {
      return isEqualObject(value, comparableObject[key]);
    }
    return value === comparableObject[key];
  });
};

export const test = <T extends Function>(declation:string, func:T, isSkip:boolean = false) => {
    if (isSkip) return;
    report.log('test');
    report.log(declation);
    func();
  };

export class Result {
  func:Function|null;
  value: unknown|null;
  static _beforeFunc:Function|null = null;
  static _doBefore:boolean = false;
  static _doAfter:boolean = false;
  static _afterFunc:Function|null = null;

  static eachBefore (func:Function) {
    this._doBefore = true;
    this._beforeFunc = func;
  }

  static eachAfter (func:Function) {
    this._doAfter = true;
    this._afterFunc = func;
  }

  static resetEachFunc () {
    this._doAfter = false;
    this._doBefore = false;
  }

  constructor () {
    this.value = null;
    report.log(Result._doBefore);
    if(Result._doBefore) Result._beforeFunc();
  }

  expect (n) {
    this.value = n;
    if(Result._doAfter) Result._afterFunc();
    return this;
  }

  showResult () {
    report.log(this.value);
  }

  callResult (resultOfBooelan:boolean,initValue?:unknown, expectation?:unknown):void  {
    if (resultOfBooelan) {
      report.log('---- test was succeeded ----')
    } else {
      report.log('---- failed the test. the value was unexpected ----');
      if (initValue !== undefined && expectation !== undefined ) report.log(`it was expected ${expectation} but value was ${initValue}`);
    }
  }

  tobeTruthy () {
    this.callResult(!!this.value === true);
  }
  tobeFalsy () {
    this.callResult(!this.value === false);
  }
  toBe (n:unknown) {
    this.callResult(this.value === n, this.value, n);
  }
  toEqual (comparableObject:Object) {
    this.callResult(isEqualObject(this.value, comparableObject));
  }
};