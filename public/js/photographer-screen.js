import { addModalEvents } from './modules/modal.js';
import { addLightBoxEvents } from './modules/lightBox.js';

import { loadData } from './modules/data.js';
import { findGetParameter } from './modules/utils.js';

import { loadPhotographers, Photographer } from './modules/photographer.js';
import { loadMedias, Media } from './modules/media.js';

// DOM elements
const genCard = document.querySelector('#gen-card');
const genMedias = document.querySelector('#gen-medias');

// load json data
const data = await loadData();
//console.log(data);

// load photographers objects from json data
const photographers = loadPhotographers(data);

//load medias objects fron json data
const medias = loadMedias(data);

// get photographer id from url parameters
let id = findGetParameter("id");

// display photographer info
for (let photographer of photographers) {
    if (photographer.id == id) {
        genCard.insertAdjacentHTML('beforeend', await photographer.displayHorizontalCardTemplate());
        break;
    }
}

// display photographer medias
for (let media of medias) {
    if (media.photographerId == id) {
        genMedias.insertAdjacentHTML('beforeend', await media.displayMediaTemplate());
    } 
}

// Add modal / lighbox events
addModalEvents();
addLightBoxEvents();
