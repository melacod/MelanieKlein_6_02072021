import { Data } from './modules/data.js';
import { PhotographerFactory } from './modules/photographer.js';
import { Template } from './modules/template.js';
import { Tag } from './modules/tag.js' ;

// Get DOM elements where elements will be generated
const genCards = document.querySelector('#gen-cards');
const genNav = document.querySelector('#gen-nav')

// load json data
const data = await Data.loadJsonData();

// load photographers objects from json data
const photographers = PhotographerFactory.createPhotographers(data.photographers);

// create filter tags
await createFilterTags();

// compute all filter tags, create html and add event
async function createFilterTags () {
    let filterTags = getFilterTags();
    await createHtmlForFilterTags(filterTags);
    Tag.addEventForEnabledTags(filterByTag);
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
async function createHtmlForFilterTags (filterTags) {
    let htmlFilterTags = "";
    for (const filterTag of filterTags) {
        htmlFilterTags += await Template.fillTemplate("tag", { tagName: filterTag, tagClass: "tag--enabled" });
    }
    genNav.innerHTML = htmlFilterTags;
}

// filter photographers based on filter tags
async function filterByTag () {
    Tag.computeScore(photographers);
    Tag.sortObjects(photographers);
    await displayPhotographerCards();
    synchronizePhotographerTags();
}

// synchronize state of disabled tags (from photographers) with enabled tags (from filter tags)
function synchronizePhotographerTags () {
    const tagsDisabled = document.querySelectorAll('.tag--disabled');
    for (let inputTag of Tag.getInputEnabledTags()) {
        let tag = inputTag.parentElement;
        let tagName = Tag.getTagName(tag);

        for (let tagDisabled of tagsDisabled) {
            let tagDisabledName = Tag.getTagName(tagDisabled);
            if (tagDisabledName == tagName) {
                tagDisabled.children[0].checked = inputTag.checked;
            }
        }
        
    }
}

// display photographer cards
async function displayPhotographerCards () {
    genCards.innerHTML = "";
    for (let photographer of photographers){
        genCards.insertAdjacentHTML('beforeend', await photographer.displayCard());
    }
}

// display photographer cards loading first time (no filter tags enabled)
await filterByTag();
