export { TagFactory };

class TagFactory {

    // <nav class="card--nav tags" aria-label="Card tag navigation">
    // <nav class="main--nav tags" aria-label="Main tag navigation / Photographer categories">
    createTags = function (parent, classTags, ariaLabelTags){
        let tags = document.createElement('nav');
        tags.classList.add(classTags);
        tags.classList.add('tags');
        tags.setAttribute("aria-label", ariaLabelTags);
        parent.appendChild(tags);
        return tags;
    } 

    // lvl 3 => create all element for a tag
    createTag = function (parent, tagName) {
        let tagLabel = this.createTagLabel (parent);
        this.createTagCheckbox (tagLabel);
        this.createTagEvents (tagLabel, tagName);
        this.createTagValue (tagLabel, tagName);
        return tagLabel;
    }

    // lvl 3 => <label class="tag">
    createTagLabel = function (parent){
        let tagLabel = document.createElement('label');
        tagLabel.classList.add('tag');
        parent.appendChild(tagLabel);
        return tagLabel;
    } 

    // lvl 4 => <input type="checkbox" />
    createTagCheckbox = function (tagLabel){
        let tagCheckbox = document.createElement('input');
        tagCheckbox.setAttribute('type', 'checkbox');
        tagLabel.appendChild(tagCheckbox);
        return tagCheckbox;
    }

    // lvl 4 => <span class="sr-only">Tag Portrait</span>
    createTagEvents = function (tagLabel, tagName) {
        let tagEvents = document.createElement('span');
        tagEvents.classList.add('sr-only');
        tagEvents.textContent = 'Tag ' + tagName;
        tagLabel.appendChild(tagEvents);
        return tagEvents;
    }

    // lvl 4 => <span>#Portrait</span>
    createTagValue = function (tagLabel, tagName) {
        var tagValue = document.createElement('span');
        tagValue.textContent = '#' + tagName;
        tagLabel.appendChild(tagValue);
        return tagValue;
    }

}
