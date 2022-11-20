import 'extendscript-es5-shim';
import '../polyfills/json2';
import '../polyfills/padStart';// padstart polyfill
import '../polyfills/trunc';// Math.trunc

import report from '../log/log';

const calc:(n:number)=>number = n => n * 4;

const showAlert:(n:number)=>void = n => {
    alert(calc(n).toString());
}

showAlert(100);