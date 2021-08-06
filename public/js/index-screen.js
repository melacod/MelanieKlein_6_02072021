import { Data } from './modules/data.js';
import { PhotographerFactory } from './modules/photographer.js';
import { Template } from './modules/template.js';

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
    addEventForFilterTags();
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

// add event click on input for filter tags
function addEventForFilterTags () {
    const inputTagsEnabled = document.querySelectorAll('.tag--enabled > input');
    for (let inputTag of inputTagsEnabled) {
        inputTag.addEventListener("click", filterByTag);
    }
}

// filter photographers based on filter tags
async function filterByTag () {
    const inputTagsEnabled = document.querySelectorAll('.tag--enabled > input');
    let tagsEnabled = getTagsEnabled(inputTagsEnabled);
    computeScore(tagsEnabled);
    sortPhotographers();
    await displayPhotographerCards();
    synchronizePhotographerTags(inputTagsEnabled);
}

// get all checked tags
function getTagsEnabled (inputTagsEnabled) {
    let tagsEnabled = [];
    for (let inputTag of inputTagsEnabled) {
        if (inputTag.checked) {
            let tag = inputTag.parentElement;
            let tagName = getTagName(tag);
            tagsEnabled.push(tagName);
        }     
    }
    return tagsEnabled;
}

// compute filter score
function computeScore (tagsEnabled) {
    for (let photographer of photographers) {
        photographer.score = 0;
        for (let tag of photographer.tags) {
            // check if tag is in tagsEnabled, increase photographer score by 1
            if (tagsEnabled.indexOf(tag) >= 0) {
                photographer.score ++;
            }
        }
    }
}

// sort photographers by score
function sortPhotographers () {
    photographers.sort( function(a,b) {
        
        if (a.score < b.score) {
            return 1; // a after b
        
        } else if (a.score > b.score) {
            return -1; // b after a

        } else {

            // when same score: sort by number of tags
            if (a.tags.length < b.tags.length) {
                return 1; // a after b

            } else if (a.tags.length > b.tags.length) {
                return -1; // b after a
            
            } else {
                return a.name > b.name ? 1 : -1;
            }
        }
    });
}

// synchronize state of disabled tags (from photographers) with enabled tags (from filter tags)
function synchronizePhotographerTags (inputTagsEnabled) {
    const tagsDisabled = document.querySelectorAll('.tag--disabled');
    for (let inputTag of inputTagsEnabled) {
        let tag = inputTag.parentElement;
        let tagName = getTagName(tag);

        for (let tagDisabled of tagsDisabled) {
            let tagDisabledName = getTagName(tagDisabled);
            if (tagDisabledName == tagName) {
                tagDisabled.children[0].checked = inputTag.checked;
            }
        }
        
    }
}

// get tag name from tag label
function getTagName (tag) {
    return tag.children[1].textContent.substring(4);
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
