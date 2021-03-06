export { Tag };

// tag manager
class Tag {
    
    // get all enabled tags
    static getEnabledLabelTags () {
        return document.querySelectorAll('.tag--enabled');
    }

    // get all enabled tags
    static getEnabledInputTags () {
        return document.querySelectorAll('.tag--enabled > input');
    }

    // get all disabled tags
    static getDisabledInputTags () {
        return document.querySelectorAll('.tag--disabled > input');
    }

    // get tag name from input tag label (from <input data-tag="xxx">)
    static getTagName (inputTag) {
        return inputTag.dataset.tag;
    }

    // get all checked tags
    static getTagNamesEnabled () {
        let tagsEnabled = [];
        for (let inputTag of Tag.getEnabledInputTags()) {
            if (inputTag.checked) {
                let tagName = Tag.getTagName(inputTag);
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

}