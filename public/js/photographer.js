import * as utilsModule from './modules/utils.js';
import * as dataModule from './modules/data.js';
import * as modalModule from './modules/modal.js';
import * as lightBoxModule from './modules/lightBox.js';

import { CardFactory } from './modules/factory-card.js';
import { TagFactory } from './modules/factory-tag.js';


// load json data
const data = await dataModule.loadData();
console.log(data);

// DOM elements
const genCard = document.querySelector('#gen-card');

let id = utilsModule.findGetParameter("id");
let photographer = findPhotographer(data.photographers, id);
loadPhotographer (photographer);

// find photographer by id
function findPhotographer (photographers, searchPhotographerId) {
    for (let photographer of photographers) {
        if (photographer.id == searchPhotographerId) {
            return photographer;
        }
    }
    return null;
}

function loadPhotographer (photographer) {
    const cardFactory = new CardFactory();
    const tagFactory = new TagFactory();

    const card = cardFactory.createCard("card__photographer");

    const cardInfo = cardFactory.createCardInfo(card);
    const cardName = cardFactory.createCardName(cardInfo, photographer.name);
    const cardLocalisation = cardFactory.createCardLocalisation(cardInfo, photographer.city, photographer.country);
    const cardDescription = cardFactory.createCardDescription(cardInfo, photographer.tagline);

    const cardTags = tagFactory.createTags (cardInfo, "card--nav", "Card tag navigation");
    for (const tag of photographer.tags) {
        tagFactory.createTag (cardTags, tag);
    }

    genCard.appendChild(card);
}

