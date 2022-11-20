import { Result, Test } from './unitTest';
import { Description } from './describe';

import { createListLayers } from '../src/mainProcess/createLayers';
import { createDocumentReturnWidth } from '../src/mainProcess/createDocument';

export const test2 = () => {
/*
    set function 
    createing document before the test
*/
Description.eachBefore(() => {
    createDocumentReturnWidth(300, 300);
});

new Description('descript creating layers', () => {
    new Test('create my list', () => {
        const layerlist = ['apple', 'orange', 'lemon'];
        new Result().expect(createListLayers(layerlist)).tobeTruthy();
    }).testing();

    new Test('hello', () => {
        alert('hello');
    }).testing();

    /*
    set args that contains value of array
    and function recieves values
    */
    new Test('create each layers', (arg) => {
        createDocumentReturnWidth(300, 300);
        new Result().expect(createListLayers(arg)).tobeTruthy();
    }).setEach([
        ['i', 'my', 'me'],
        ['jun', 'mai', 'mei']
    ]).testing();
}).skip().describe();

new Description('description how can error be happned', () => {
    new Test('empty list', () => {
        const layerlist = ['apple', '', 'banana'];
        new Result().expect(createListLayers(layerlist)).tobeFalsy();
    }).testing();
}).describe();

}