import * as dataModule from './modules/data.js';
import { Photographer } from './modules/photographer.js';

// load json data
const data = await dataModule.loadData();
console.log(data);

// DOM elements
const genCards = document.querySelector('#gen-cards');

// initialze photographers card
addPhotogarpherCards(data.photographers);

// create photographers card
function addPhotogarpherCards (photographers) {
    for (let photographer of photographers){
        const photographerObj = new Photographer(photographer.id, photographer.name, photographer.portrait, photographer.city,
            photographer.country, photographer.price, photographer.tagline, photographer.tags);
        
        photographerObj.displayCard(genCards);

    }
}

