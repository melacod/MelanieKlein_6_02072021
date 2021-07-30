import { loadData } from './modules/data.js';
import { loadPhotographers, Photographer } from './modules/photographer.js';
import { fillTemplate } from './modules/template.js';

// DOM elements
const genCards = document.querySelector('#gen-cards');
const genNav = document.querySelector('#gen-nav')

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

// compute all possible tags
let allTags = [];
for (let photographer of photographers) {
    for (let tag of photographer.tags) {
        if (allTags.indexOf(tag) == -1) {
            allTags.push(tag);
        }
    }
}

// display html for all tags
let htmlTags = "";
for (const tag of allTags) {
    htmlTags += await fillTemplate("tag", { tagName: tag });
}
genNav.innerHTML = htmlTags;

