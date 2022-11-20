import 'extendscript-es5-shim';
import '../polyfills/json2';
import '../polyfills/padStart';// padstart polyfill
import '../polyfills/trunc';// Math.trunc

import { test1 } from './test1';
import { test2 } from './test2';

type TestSwitch = {
  func: Function,
  testSwitch: boolean
}

const tests:TestSwitch[] = [
    {
      func: test1,
      testSwitch: true
    },
    {
      func: test2,
      testSwitch: false
    }
];

tests.forEach(t => {
    if (t.testSwitch) t.func();
});