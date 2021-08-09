export { Tag };

// tag manager
class Tag {
    
    // get all enabled tags
    static getInputEnabledTags () {
        return document.querySelectorAll('.tag--enabled > input');
    }

    // add event click on input for enbaled tags
    static addEventForEnabledTags (clickFunction) {
        for (let inputTag of Tag.getInputEnabledTags()) {
            inputTag.addEventListener("click", clickFunction);
        }
    }

    // get tag name from tag label (from <span>Tag xxx</span> => remove 4 characters = [Tag ])
    static getTagName (tag) {
        return tag.children[1].textContent.substring(4);
    }

    // get all checked tags
    static getTagNamesEnabled () {
        let tagsEnabled = [];
        for (let inputTag of Tag.getInputEnabledTags()) {
            if (inputTag.checked) {
                let tag = inputTag.parentElement;
                let tagName = Tag.getTagName(tag);
                tagsEnabled.push(tagName);
            }     
        }
        return tagsEnabled;
    }

    // compute filter score for each object
    static computeScore (objects) {
        let tagNamesEnabled = Tag.getTagNamesEnabled();
        for (let obj of objects) {

            // if not tags selected, set score to -1
            if (tagNamesEnabled.length === 0) {
                obj.score = -1;
            } else {
                
                obj.score = 0;
                for (let tag of obj.tags) {
                    // if tag is in tagNamesEnabled, increase obj score by 1
                    if (tagNamesEnabled.indexOf(tag) >= 0) {
                        obj.score ++;
                    }
                }
            }
        }
    }

    // sort objects by 
    // 1. score (descendant)
    // 2. number of tags (descendant)
    // 3. name (ascendant)
    static sortObjects (objects) {
        objects.sort( function(a,b) {
            
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

}