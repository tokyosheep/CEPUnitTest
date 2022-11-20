import { Result, Test } from './unitTest';

import { createDocumentReturnWidth } from '../src/mainProcess/createDocument';
import report from '../log/log';

export const test1 = () => {

Result.eachBefore(() => {
    report.log('before do');
});

Result.eachAfter(() => {
    report.log('after you did');
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
});

new Test('try to test', () => {
    new Result().expect(createDocumentReturnWidth(400,900)).toBe(400);
}).testing();

new Test('try to test', () => {
    new Result().expect(createDocumentReturnWidth(900,1200)).toBe(900);
}).testing();

}