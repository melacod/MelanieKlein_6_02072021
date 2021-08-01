import { loadData } from './modules/data.js';
import { loadPhotographers, Photographer } from './modules/photographer.js';
import { fillTemplate } from './modules/template.js';

// DOM elements
const genCards = document.querySelector('#gen-cards');
const genNav = document.querySelector('#gen-nav')

// load json data
const data = await loadData();
//console.log(data);

// load photographers objects from json data
const photographers = loadPhotographers(data);

// compute all possible tags
let allTags = [];
for (let photographer of photographers) {
    for (let tag of photographer.tags) {
        // check if tag is not in allTags
        if (allTags.indexOf(tag) == -1) {
            allTags.push(tag);
        }
    }
}

// display html for all tags
let htmlTags = "";
for (const tag of allTags) {
    htmlTags += await fillTemplate("tag", { tagName: tag, tagClass: "tag--enabled" });
}
genNav.innerHTML = htmlTags;

// DOM tags
const inputTagsEnabled = document.querySelectorAll('.tag--enabled > input');
for (let inputTag of inputTagsEnabled) {
    inputTag.addEventListener("click", tagFilter);
}

// filter photographers based on filter tags
async function tagFilter () {
    let tagsEnabled = getTagsEnabled();
    computeScore(tagsEnabled);
    sortPhotographers();
    await displayPhotographerCards();
    highlightPhotographerTags(tagsEnabled);
}

// compute filter score
function computeScore (tagsEnabled) {
    for (let photographer of photographers) {
        photographer.score = 0;
        for (let tag of photographer.tags) {
            // check if tag is in tagsEnabled
            if (tagsEnabled.indexOf(tag) >= 0) {
                photographer.score ++;
            }
        }
        //console.log(photographer.name + " => " + photographer.tags + " => " + photographer.score);
    }
}

// get all checked tags
function getTagsEnabled () {
    let tagsEnabled = [];
    for (let inputTag of inputTagsEnabled) {
        
        let tag = inputTag.parentElement;
        let tagName = getTagName(tag);
        if (inputTag.checked) {
            tagsEnabled.push(tagName);
        }
       
    }
    //console.log(tagsEnabled);
    return tagsEnabled;
}

// get tag name from tag label
function getTagName (tag) {
    return tag.children[1].textContent.substring(4);
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

// highlight photographer tags from filter tags
function highlightPhotographerTags (tagsEnabled) {
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

// display photographer cards
async function displayPhotographerCards () {
    genCards.innerHTML = "";
    for (let photographer of photographers){
        genCards.insertAdjacentHTML('beforeend', await photographer.displayCardTemplate());
    }
}

// display photographer cards loading first time (no filter)
await tagFilter();
