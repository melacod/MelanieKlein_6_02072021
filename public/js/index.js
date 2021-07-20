import * as dataModule from './modules/data.js';

import { CardFactory } from './modules/factory-card.js';
import { TagFactory } from './modules/factory-tag.js';

// load json data
const data = await dataModule.loadData();
console.log(data);

// DOM elements
const cards = document.querySelector('#gen-cards');

// initialze photographers card
addPhotogarpherCards(data.photographers);

// create photographers card
function addPhotogarpherCards (photographers) {
    for (let photographer of photographers){
        addPhotogarpherCard(photographer);
    }
}

// create one photographer card
function addPhotogarpherCard (photographer) {
    const cardFactory = new CardFactory();
    const tagFactory = new TagFactory();
    
    const card = cardFactory.createCard();
    const cardLink = cardFactory.createCardLink(card, photographer.name, photographer.id);
    cardFactory.createCardImage (cardLink, photographer.portrait);
    cardFactory.createCardName (cardLink, photographer.name);
    cardFactory.createCardLocalisation (card, photographer.city, photographer.country);
    cardFactory.createCardDescription (card, photographer.tagline);
    cardFactory.createCardPrice (card, photographer.price);
    
    // <nav class="card--nav tags" aria-label="Card tag navigation">
    // <nav class="main--nav tags" aria-label="Main tag navigation / Photographer categories">

    const cardTags = tagFactory.createTags (card, "card--nav", "Card tag navigation");
    
    for (const tag of photographer.tags) {
        tagFactory.createTag (cardTags, tag);
    }

    cards.appendChild(card);
}
