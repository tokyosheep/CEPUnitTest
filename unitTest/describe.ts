import report from '../log/log';

/**
 * there's no Promise methond on ExtendScript
 */

/**
 * description
 * grouping test code in this class
 */
export class Description {
    func: Function;
    isSkip: boolean;

    static _beforeFunc:Function|null = null;
    static _doBefore:boolean = false;
    static _doAfter:boolean = false;
    static _afterFunc:Function|null = null;

    /**
     * set function it's called before test
     * @param func @type {Function} 
     */
    static eachBefore (func:Function) {
      this._doBefore = true;
      this._beforeFunc = func;
    }
    /**
     * set function it's called after test
     * @param func @type {Function} 
     */
    static eachAfter (func:Function) {
      this._doAfter = true;
      this._afterFunc = func;
    }
  
    /**
     * reset test status
     */
    static resetEachFunc () {
      this._doAfter = false;
      this._doBefore = false;
    }
    constructor (description:string, func:Function) {
      report.log(['description', description]);
      this.func = func;
    }

    /**
     * skip the description
     * @returns @type {this}
     */
    skip () {
        this.isSkip = true;
        report.log('skiped');
        return this;
    }

    /**
     * call the tests
     * @returns @type {void}
     */
    describe () {
        if(this.isSkip) return;
        if(Description._doBefore) Description._beforeFunc();
        this.func();
        if(Description._doAfter) Description._afterFunc();
    }
};
