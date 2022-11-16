import report from '../log/log';

/**
 * there's no Promise methond on ExtendScript
 */

export class Description {
    func: Function;
    isSkip: boolean;
    constructor (description:string, func:Function) {
      report.log(['description', description]);
      this.func = func;
    }

    skip () {
        this.isSkip = true;
        report.log('skiped');
        return this;
    }

    describe () {
        if(this.isSkip) return;
        this.func();
    }
};
