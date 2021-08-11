import { Modal } from './modules/modal.js';
import { LightBox } from './modules/lightBox.js';
import { Utils } from './modules/utils.js';
import { Data } from './modules/data.js';
import { Tag } from './modules/tag.js' ;

import { createPhotographers, createMedias } from './modules/factory.js';

// Get DOM elements where elements will be generated
const genCard = document.querySelector('#gen-card');
const genMedias = document.querySelector('#gen-medias');
const genInfos = document.querySelector('#gen-infos');
const menuPopularity = document.querySelector('#menu-popularity');
const menuTitle = document.querySelector('#menu-title');
const menuDate = document.querySelector('#menu-date');

// bind event with element
menuPopularity.addEventListener("click", sortByPopularity);
menuTitle.addEventListener("click", sortByTitle);
menuDate.addEventListener("click", sortByDate);

// load json data
const data = await Data.loadJsonData();

// load photographers objects from json data
const photographers = createPhotographers(data.photographers);

//load medias objects fron json data
const medias = createMedias(data.media);

// get photographer id from url parameters
let id = Utils.findGetParameter("id");


// get medias for photographer id
let mediasForId = getMediasForId();
await displayMedias();

// display photographer info
for (let photographer of photographers) {
    if (photographer.id == id) {
        genCard.insertAdjacentHTML('beforeend', await photographer.displayHorizontalCard());
        photographer.likes = getTotalLikes(mediasForId);
        genInfos.insertAdjacentHTML('beforeend', await photographer.displayFloatingInfos());
        break;
    }
}

// display photographer medias
async function displayMedias () {
    genMedias.innerHTML = "";
    for (let media of mediasForId) {
        // if media score is -1 = no filter tags selected = display all
        // if media score > 0 = at least one selected filter tag match
        if (media.score === -1 || media.score > 0) {
            genMedias.insertAdjacentHTML('beforeend', await media.display());
        }
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

// get total likes for photographer medias
function getTotalLikes (mediasForId) {
    let totalLikes = 0;
    for (let media of mediasForId){
        totalLikes += media.likes;
    }
    return totalLikes;
}

// sort medias by popularity (likes)
function sortByPopularity () {
    mediasForId.sort( function(a,b) {
        
        if (a.likes < b.likes) {
            return 1; // a after b
        
        } else if (a.likes > b.likes) {
            return -1; // b after a

        } else {

            // when same likes: sort by title
            return a.title > b.title ? 1 : -1;
        }
    });
    displayMedias();
}

//sort medias by title
function sortByTitle (){
    mediasForId.sort (function (a,b) {

        return a.title > b.title ? 1 : -1;
        
    });
    displayMedias();
}

//sort medias by date
function sortByDate (){
    mediasForId.sort (function (a,b) {

        if (a.date.getTime() < b.date.getTime()) {
            return 1; // a after b
        
        } else if (a.date.getTime() > b.date.getTime()) {
            return -1; // b after a

        } else {

            // when same date: sort by title
            return a.title > b.title ? 1 : -1;
        }
        
    });
    displayMedias();
}

// add events for tags
Tag.addEventForEnabledTags(filterByTag);

// filter media on selected filter tags (no filter : all medias displayed)
async function filterByTag () {
    Tag.computeScore(mediasForId);
    Tag.sortObjects(mediasForId);
    await displayMedias();
}

// Add modal / lighbox events
Modal.addModalEvents();
LightBox.addLightBoxEvents();
