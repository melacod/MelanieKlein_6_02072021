import { addModalEvents } from './modules/modal.js';
import { addLightBoxEvents } from './modules/lightBox.js';

import { loadData } from './modules/data.js';
import { findGetParameter } from './modules/utils.js';

import { loadPhotographers, Photographer } from './modules/photographer.js';
import { loadMedias, Media } from './modules/media.js';

// Get DOM elements where elements will be generated
const genCard = document.querySelector('#gen-card');
const genMedias = document.querySelector('#gen-medias');
const menuPopularity = document.querySelector('#menu-popularity');
const menuTitle = document.querySelector('#menu-title');


// bind event with element
menuPopularity.addEventListener("click", sortByPopularity);
menuTitle.addEventListener("click", sortByTitle);


// load json data
const data = await loadData();
//console.log(data);

// load photographers objects from json data
const photographers = loadPhotographers(data);

//load medias objects fron json data
const medias = loadMedias(data);

// get photographer id from url parameters
let id = findGetParameter("id");

// get medias for photographer id
let mediasForId = getMediasForId();
await displayMedias();

// display photographer info
for (let photographer of photographers) {
    if (photographer.id == id) {
        genCard.insertAdjacentHTML('beforeend', await photographer.displayHorizontalCardTemplate());
        break;
    }
}

// display photographer medias
async function displayMedias () {
    genMedias.innerHTML = "";
    for (let media of mediasForId) {
        genMedias.insertAdjacentHTML('beforeend', await media.displayMediaTemplate());
    }
}

// get medias only for photographer id
function getMediasForId () {
    let mediasForId = [];
    for (let media of medias) {
        if (media.photographerId == id) {
            mediasForId.push(media);
        }
    }
    return mediasForId;
}

// sort medias by popularity (likes)
function sortByPopularity () {
    mediasForId.sort( function(a,b) {
        
        if (a.likes < b.likes) {
            return 1; // a after b
        
        } else if (a.likes > b.likes) {
            return -1; // b after a

        } else {

            // when same score: sort by title
            return a.title > b.title ? 1 : -1;
        }
    });
    displayMedias();
}

//sort medias by title (title)
function sortByTitle (){
    mediasForId.sort (function (a,b) {

        return a.title > b.title ? 1 : -1;
        
    });
    displayMedias();
}


// Add modal / lighbox events
addModalEvents();
addLightBoxEvents();
