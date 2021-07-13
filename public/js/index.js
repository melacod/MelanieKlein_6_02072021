import * as dataModule from './modules/data.js';
import * as modalModule from './modules/modal.js';

const data = await dataModule.loadData();
console.log(data);



