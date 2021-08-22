import { Data } from './modules/data.js';
import { Template } from './modules/template.js';
import { Tag } from './modules/tag.js' ;

import { createPhotographers } from './modules/factory.js';
import { Utils } from './modules/utils.js';

// Get DOM elements where elements will be generated
const genCards = document.querySelector('#gen-cards');
const genNav = document.querySelector('#gen-nav')

// load all templates
await Template.loadTemplates();

// load json data
const data = await Data.loadJsonData();

// load photographers objects from json data
const photographers = createPhotographers(data.photographers);

// create filter tags
createFilterTags();

// display photographer cards loading first time (no filter tags enabled)
filterByTag();

// compute all filter tags, create html and add event
function createFilterTags () {
    let filterTags = getFilterTags();
    createHtmlForFilterTags(filterTags);
    addEventForEnabledTags();
}

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

// compute filter tags (unique tag names)
function getFilterTags () {
    let filterTags = [];
    for (let photographer of photographers) {
        for (let tag of photographer.tags) {
            
            // if tag is not in filterTags, add it to filterTags
            if (filterTags.indexOf(tag) == -1) {
                filterTags.push(tag);
            }
        }
    }
    return filterTags;
}

// create html for filter tags
function createHtmlForFilterTags (filterTags) {
    let htmlFilterTags = "";
    for (const filterTag of filterTags) {
        htmlFilterTags += Template.fillTemplate("tag", { tagName: filterTag, tagClass: "tag--enabled", tagTabIndex: "0" });
    }
    genNav.innerHTML = htmlFilterTags;
}

// filter photographers based on filter tags
function filterByTag () {
    Tag.computeScore(photographers);
    Tag.sortObjects(photographers);
    displayPhotographerCards();
    synchronizePhotographerTags();
}

// synchronize state of disabled tags (from photographers) with enabled tags (from filter tags)
function synchronizePhotographerTags () {
    const enabledInputTags = Tag.getEnabledInputTags();
    const disabledInputTags = Tag.getDisabledInputTags();

    for (let enabledInputTag of enabledInputTags) {
        let enabledTagName = Tag.getTagName(enabledInputTag);

        for (let disabledInputTag of disabledInputTags) {
            let disabledTagName = Tag.getTagName(disabledInputTag);

            if (disabledTagName == enabledTagName) {
                disabledInputTag.checked = enabledInputTag.checked;
            }
        }
        
    }
}

// display photographer cards
function displayPhotographerCards () {
    genCards.innerHTML = "";
    for (let photographer of photographers){
        genCards.insertAdjacentHTML('beforeend', photographer.displayCard());
    }
}
