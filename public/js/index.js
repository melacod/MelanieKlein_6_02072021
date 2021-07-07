import * as dataModule from './modules/data.js';

const data = await dataModule.loadData();
console.log(data);
