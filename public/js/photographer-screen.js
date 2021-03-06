import { Data } from './modules/data.js';
import { Template } from './modules/template.js';
import { Utils } from './modules/utils.js';
import { Modal } from './modules/modal.js';
import { LightBox } from './modules/lightBox.js';
import { Tag } from './modules/tag.js' ;
import { Factory } from './modules/factory.js';

// Get DOM elements where elements will be generated
const genCard = document.querySelector('#gen-card');
const genModalContact = document.querySelector('#gen-modal-contact');
const genModalLightbox = document.querySelector('#gen-modal-lightbox');
const genMedias = document.querySelector('#gen-medias');
const genInfos = document.querySelector('#gen-infos');
const menuSelected = document.querySelector('#menu--selected');
const menuItems = document.querySelectorAll('.menu--items > p');

// bind event with element
for (let menuItem of menuItems) {
    menuItem.addEventListener("click", selectMenuItem);
    menuItem.addEventListener("keyup", keyUpMenuItem);
}
menuSelected.addEventListener("keyup", keyUpMenuSelected);

// loaded json data
let data = {};

// array of all photographer objects
let photographers = [];

// array of all medias objects
let medias = [];

// id of photographer from URL parameter
let id = 0;

// photographer to display
let photographer = {};

// array of medias for photographer to display
let mediasForId = [];

// light box object
let lightBox = {};

// load all templates
Template.loadTemplates().then( () => {

    // load json data
    Data.loadJsonData().then( (jsonData) => {

        // set data from loaded json data
        data = jsonData;

        // load photographers objects from json data
        photographers = Factory.createPhotographers(data.photographers);

        //load medias objects fron json data
        medias = Factory.createMedias(data.media);

        // get photographer id from url parameters
        id = Utils.findGetParameter("id");

        // get the photographer with the given id
        photographer = getPhotographerById();

        // display modal contact
        genModalContact.insertAdjacentHTML('beforeend', Template.fillTemplate('modal-contact', photographer));

        // light box
        genModalLightbox.insertAdjacentHTML('beforeend', Template.fillTemplate('modal-lightbox', {}));
        lightBox = new LightBox();

        // get medias for photographer id
        mediasForId = getMediasForId();
        displayMedias();

        // display photographer horizontal card and floating infos
        genCard.innerHTML = "";
        genCard.insertAdjacentHTML('beforeend', photographer.displayHorizontalCard());
        moveCardContact();
        displayFloatingInfos();

        // add event for tags
        addEventForEnabledTags();

        // Add modal / lighbox events
        Modal.addModalEvents();

    });
});

// add event click on input for enbaled tags
function addEventForEnabledTags () {
    for (let labelTag of Tag.getEnabledLabelTags()) {
        labelTag.addEventListener("keyup", enterFilterByTag);
    }
    for (let inputTag of Tag.getEnabledInputTags()) {
        inputTag.addEventListener("click", filterByTag);
    }
}

// add event keyup for label enabled tags : filter tags when enter pressed
function enterFilterByTag (event) {
    if (event.key === "Enter") {
        const labelTag = event.target;
        const inputTag = labelTag.querySelector('input');
        inputTag.checked = !inputTag.checked;
        filterByTag();
    }
}

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
    let mediasForLightBox = [];
    for (let media of mediasForId) {
        // if media score is -1 = no filter tags selected = display all
        // if media score > 0 = at least one selected filter tag match
        if (media.score === -1 || media.score > 0) {
            mediasForLightBox.push(media);
            genMedias.insertAdjacentHTML('beforeend', media.display());
        }
    }
    addEventsForLikes();
    lightBox.setMedias(mediasForLightBox);
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
        menuSelected.setAttribute('aria-label', 'Tri actif: ' + menuSelected.textContent);
        displayMedias();
    }
}

// Display or hide menu items on menu selected
function keyUpMenuSelected (event) {
    const menuItemsContainer = document.querySelector('.menu--items');
    if (event.key === "ArrowUp") {
        menuItemsContainer.style.display = 'none';
    
    } else if (event.key === "ArrowDown") {
        menuItemsContainer.style.display = 'block';
    
    } else if (event.key === "Enter") {
        
        const firstTime = menuItemsContainer.style.display == "";
        if (firstTime || menuItemsContainer.style.display == 'none') {
            menuItemsContainer.style.display = 'block';
        } else {
            menuItemsContainer.style.display = 'none';
        }
    }
}

// Display or hide menu items on menu selected
function keyUpMenuItem (event) {
    if (event.key === "Enter") {
        selectMenuItem(event);
    }
}

// sot medias by menu item selected
function sortMedias () {
    switch (menuSelected.textContent) {
        case 'Popularit??':
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
            return -1; // b older than a => b after a
        
        } else if (a.date.getTime() > b.date.getTime()) {
            return 1; // a older than b => a after b

        } else {

            // when same date: sort by title
            return a.title > b.title ? 1 : -1;
        }
        
    });
}

// filter media on selected filter tags (no filter : all medias displayed)
function filterByTag () {
    Tag.computeScore(mediasForId);
    displayMedias();
}

// add events for likes
function addEventsForLikes () {
    const spanLikes = document.querySelectorAll('span.likes');
    for (let spanLike of spanLikes) {
        spanLike.addEventListener('keyup', enterUpdateLikes);
    }
    const iconLikes = document.querySelectorAll('i.likes');
    for (let iconLike of iconLikes) {
        iconLike.addEventListener('click', updateLikes);
    }
}

// add event keyup for likes : update likes when enter pressed
// the target element is span
function enterUpdateLikes (event) {
    if (event.key === "Enter") {
        let icon = event.target.querySelector('i');
        updateLikesIcon(icon);
    }
}

// update number of likes in the media and display medias/photographer
// the target element is icon
function updateLikes (event) {
    updateLikesIcon(event.target);
}

// update number of likes in the media and display medias/photographer from icon
function updateLikesIcon (iconLike) {
    for (let media of mediasForId) {
        if (media.id == iconLike.dataset.mediaId) {
            if (media.likedClass == "far fa-heart") {
                media.likedClass = "fas fa-heart";
                media.likes ++;
            } else {
                media.likedClass = "far fa-heart";
                media.likes --;
            }
       }
    }
    displayMedias();
    displayFloatingInfos();
}

// move card contact if change on media query
let mediaQuery = window.matchMedia("(max-width: 1199px)");
mediaQuery.addEventListener( "change", () => {
    moveCardContact ();
});

// move card contact button under body for fixed position
// else put in before card link
function moveCardContact () {
    let mediaQuery = window.matchMedia("(max-width: 1199px)");
    let cardContact = document.querySelector('.card--contact');
    if (mediaQuery.matches) {
        document.body.appendChild(cardContact);
    } else {
        let cardLink = document.querySelector('.card--link');
        cardLink.parentElement.insertBefore(cardContact, cardLink);
    }
}
