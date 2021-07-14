import * as dataModule from './modules/data.js';
import * as modalModule from './modules/modal.js';
import * as lightBoxModule from './modules/lightBox.js';

const data = await dataModule.loadData();
console.log(data);



