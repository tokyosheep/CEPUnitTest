import 'extendscript-es5-shim';
import '../polyfills/json2';
import '../polyfills/padStart';// padstart polyfill
import '../polyfills/trunc';// Math.trunc

import { test, Result } from './unitTest';

import { createDocumentReturnWidth } from '../src/mainProcess/createDocument';
import report from '../log/log';

Result.eachBefore(() => {
    report.log('before do');
});

Result.eachAfter(() => {
    report.log('after you did');
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
});

test('try to test', () => {
    new Result().expect(createDocumentReturnWidth(400,900)).toBe(400);
});

test('try to test', () => {
    new Result().expect(createDocumentReturnWidth(900,1200)).toBe(900);
});