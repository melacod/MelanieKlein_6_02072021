import { Data } from './modules/data.js';
import { Template } from './modules/template.js';
import { Utils } from './modules/utils.js';
import { Modal } from './modules/modal.js';
import { LightBox } from './modules/lightBox.js';
import { Tag } from './modules/tag.js' ;
import { createPhotographers, createMedias } from './modules/factory.js';

// Get DOM elements where elements will be generated
const genCard = document.querySelector('#gen-card');
const genMedias = document.querySelector('#gen-medias');
const genInfos = document.querySelector('#gen-infos');
const menuSelected = document.querySelector('#menu--selected');
const menuItems = document.querySelectorAll('.menu--items > p');

// bind event with element
for (let menuItem of menuItems) {
    menuItem.addEventListener("click", selectMenuItem);
}

// load all templates
await Template.loadTemplates();

// load json data
const data = await Data.loadJsonData();

// load photographers objects from json data
const photographers = createPhotographers(data.photographers);

//load medias objects fron json data
const medias = createMedias(data.media);

// get photographer id from url parameters
let id = Utils.findGetParameter("id");

// get the photographer with the given id
let photographer = getPhotographerById();

// get medias for photographer id
let mediasForId = getMediasForId();
displayMedias();

// display photographer horizontal card and floating infos
genCard.innerHTML = "";
genCard.insertAdjacentHTML('beforeend', photographer.displayHorizontalCard());
displayFloatingInfos();

// add events for tags
Tag.addEventForEnabledTags(filterByTag);

// Add modal / lighbox events
Modal.addModalEvents();

// search the photographer to display
function getPhotographerById () {
    for (let currentPhotographer of photographers) {
        if (currentPhotographer.id == id) {
            return currentPhotographer;
        }
    }
}

// display photographer floating infos
function displayFloatingInfos () {
    photographer.likes = getTotalLikes(mediasForId);
    genInfos.innerHTML = "";
    genInfos.insertAdjacentHTML('beforeend', photographer.displayFloatingInfos());
}

// display photographer medias
function displayMedias () {
    genMedias.innerHTML = "";
    sortMedias();
    for (let media of mediasForId) {
        // if media score is -1 = no filter tags selected = display all
        // if media score > 0 = at least one selected filter tag match
        if (media.score === -1 || media.score > 0) {
            genMedias.insertAdjacentHTML('beforeend', media.display());
        }
    }
    addEventsForLikes();
    LightBox.addLightBoxEvents();
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

// select menu item
function selectMenuItem (event) {
    let menuItem = event.target;
    if (menuSelected.textContent !== menuItem.textContent) {
        menuSelected.textContent = menuItem.textContent;
        displayMedias();
    }
}

// sot medias by menu item selected
function sortMedias () {
    switch (menuSelected.textContent) {
        case 'Popularité':
            sortByPopularity();
            break;
        case 'Date':
            sortByDate();
            break;
        case 'Titre':
            sortByTitle();
            break;
        default:
            sortByPopularity();
    }
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
}

//sort medias by title
function sortByTitle (){
    mediasForId.sort (function (a,b) {

        return a.title > b.title ? 1 : -1;
        
    });
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
}

// filter media on selected filter tags (no filter : all medias displayed)
function filterByTag () {
    Tag.computeScore(mediasForId);
    Tag.sortObjects(mediasForId);
    displayMedias();
}

// add events for likes
function addEventsForLikes () {
    const iconLikes = document.querySelectorAll('.likes');
    for (let iconLike of iconLikes) {
        iconLike.addEventListener('click', updateLikes);
    }
}

// update number of likes in the media and display medias/photographer
function updateLikes (event) {
    let iconLike = event.target;
    for (let media of mediasForId) {
        if (media.id == iconLike.dataset.mediaId) {
            media.likes ++;
        }
    }
    displayMedias();
    displayFloatingInfos();
}
