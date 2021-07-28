import { loadData } from './modules/data.js';
import { loadPhotographers, Photographer } from './modules/photographer.js';

// DOM elements
const genCards = document.querySelector('#gen-cards');

// load json data
const data = await loadData();
console.log(data);

// load photographers objects from json data
const photographers = loadPhotographers(data);

// initialze photographers card
for (let photographer of photographers){
    //genCards.appendChild(photographer.displayCard());
    genCards.insertAdjacentHTML('beforeend', await photographer.displayCardTemplate());
}

