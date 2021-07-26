export { loadPhotographers, Photographer };

function loadPhotographers (data) {
    const photographers = [];
    for (let photographer of data.photographers){
        const photographerObj = new Photographer(photographer.id, photographer.name, photographer.portrait, photographer.city,
            photographer.country, photographer.price, photographer.tagline, photographer.tags);
            photographers.push(photographerObj);
    }
    return photographers;
}
class Photographer {

    constructor (id, name, portrait, city, country, price, tagline, tags){
        this.id = id;
        this.name = name;
        this.portrait = portrait;
        this.city = city;
        this.country = country;
        this.price = price;
        this.tagline = tagline;
        this.tags = tags;
    }

    displayCard = function (parent) {
        const card = this.createCard();
        const cardLink = this.createCardLink(card);
        this.createCardImage (cardLink);
        this.createCardName (cardLink);
        this.createCardLocalisation (card);
        this.createCardDescription (card);
        this.createCardPrice (card);
        const cardTags = this.createTags (card, "card--nav", "Card tag navigation");
        for (const tag of this.tags) {
            this.createTag (cardTags, tag);
        }
        parent.appendChild(card);
        return card;
    }

    displayHorizontalCard = function (parent) {
        const card = this.createCard("card__photographer");
        
        const cardInfo = this.createCardInfo(card);
        this.createCardName(cardInfo);
        this.createCardLocalisation(cardInfo);
        this.createCardDescription(cardInfo);
        const cardTags = this.createTagsLeft (cardInfo, "card--nav", "Card tag navigation");
        for (const tag of this.tags) {
            this.createTag (cardTags, tag);
        }

        const cardContact = this.createCardContact(card);
        this.createBtnContact(cardContact);

        const cardLink = this.createCardLink(card, false);
        this.createCardImage(cardLink);

        parent.appendChild(card);
        return card;
    }

    // lvl 1 => <div class="card">
    createCard = function (cardClass) {
        const card = document.createElement("div");
        card.classList.add('card');
        if (cardClass !== undefined) {
            card.classList.add(cardClass);
        }
        return card;
    }

    // lvl 2 => <div class="card--info">
    createCardInfo = function(parent) {
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card--info');
        parent.appendChild(cardInfo);
        return cardInfo;
    }

    // lvl 2 =>  <a class="card--link" href="photographer.html?id=xxx" alt="Mimi Keel">
    // <a class="card--link" href="#" alt="Mimi Keel">
    createCardLink = function (parent, addHref=true) {
        let cardLink = document.createElement("a");
        cardLink.classList.add('card--link');
        if (addHref) {
            cardLink.setAttribute('href', "photographer.html?id=" + this.id);
        } else {
            cardLink.setAttribute('href', "#");
        }
        cardLink.setAttribute('alt', this.name);
        parent.appendChild(cardLink);
        return cardLink;
    }
    
    // lvl 3 => <img class="card--image" src="./public/img/photos/MimiKeel/Portrait_Nora.jpg" alt="Mimi Keel" />
    createCardImage = function (parent) {
        let cardImage = document.createElement("img");
        cardImage.classList.add('card--image');
        cardImage.setAttribute("src", "./public/media/Photographers_ID/" + this.portrait);
        cardImage.setAttribute("alt", this.name);
        parent.appendChild(cardImage);
        return cardImage;
    }

    // lvl 3 => <h2 class="card--name">Mimi Keel</h2>
    createCardName = function (parent) {
        let cardName = document.createElement('h2');
        cardName.classList.add('card--name');
        cardName.textContent = this.name;
        parent.appendChild(cardName);
        return cardName;
    }

    // lvl 2 => <div class="card--localisation">London, UK</div>
    createCardLocalisation = function (parent){
        let cardLocalisation = document.createElement('div');
        cardLocalisation.classList.add('card--localisation');
        cardLocalisation.textContent = this.city + ', ' + this.country;
        parent.appendChild(cardLocalisation);
        return cardLocalisation;
    }

    // lvl 2 => <div class="card--description">Voir le beau dans le quotidien</div>
    createCardDescription = function (parent){
        let cardDescription = document.createElement('div');
        cardDescription.classList.add('card--description');
        cardDescription.textContent = this.tagline;
        parent.appendChild(cardDescription);
        return cardDescription;
    }

    // lvl 2 => <div class="card--price">400€/jour</div>
    createCardPrice = function (parent){
        let cardPrice = document.createElement('div');
        cardPrice.classList.add('card--price');
        cardPrice.textContent = this.price + "€/jour";
        parent.appendChild(cardPrice);
        return cardPrice;
    } 

    // lvl 2 => <nav class="card--nav tags" aria-label="Card tag navigation">
    createCardTags = function (parent){
        let cardTags = document.createElement('nav');
        cardTags.classList.add('card--nav');
        cardTags.classList.add('tags');
        cardTags.setAttribute("aria-label", "Card tag navigation");
        parent.appendChild(cardTags);
        return cardTags;
    } 

    // lvl 3 => create all element for a tag
    createCardTag = function (cardTags, tagName) {
        let tagLabel = this.createCardTagLabel (cardTags);
        this.createCardTagCheckbox (tagLabel);
        this.createCardTagEvents (tagLabel, tagName);
        this.createCardTagValue (tagLabel, tagName);
        return tagLabel;
    }

    // lvl 3 => <label class="tag">
    createCardTagLabel = function (cardTags){
        let tagLabel = document.createElement('label');
        tagLabel.classList.add('tag');
        cardTags.appendChild(tagLabel);
        return tagLabel;
    } 

    // lvl 4 => <input type="checkbox" />
    createCardTagCheckbox = function (tagLabel){
        let tagCheckbox = document.createElement('input');
        tagCheckbox.setAttribute('type', 'checkbox');
        tagLabel.appendChild(tagCheckbox);
        return tagCheckbox;
    }

    // lvl 4 => <span class="sr-only">Tag Portrait</span>
    createCardTagEvents = function (tagLabel, tagName) {
        let tagEvents = document.createElement('span');
        tagEvents.classList.add('sr-only');
        tagEvents.textContent = 'Tag ' + tagName;
        tagLabel.appendChild(tagEvents);
        return tagEvents;
    }

    // lvl 4 => <span>#Portrait</span>
    createCardTagValue = function (tagLabel, tagName) {
        var tagValue = document.createElement('span');
        tagValue.textContent = '#' + tagName;
        tagLabel.appendChild(tagValue);
        return tagValue;
    }

    // <nav class="card--nav tags" aria-label="Card tag navigation">
    // <nav class="main--nav tags" aria-label="Main tag navigation / Photographer categories">
    // <nav class="xxx tags" aria-label="xxx">
    createTags = function (parent, classTags, ariaLabelTags){
        let tags = document.createElement('nav');
        tags.classList.add('tags');
        tags.classList.add(classTags);
        tags.setAttribute("aria-label", ariaLabelTags);
        parent.appendChild(tags);
        return tags;
    } 

    // <nav class="xxx tags tags--left" aria-label="xxx">
    createTagsLeft = function (parent, classTags, ariaLabelTags){
        let tags = this.createTags(parent, classTags, ariaLabelTags)
        tags.classList.add('tags--left');
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
    createTagEvents = function (parent, tagName) {
        let tagEvents = document.createElement('span');
        tagEvents.classList.add('sr-only');
        tagEvents.textContent = 'Tag ' + tagName;
        parent.appendChild(tagEvents);
        return tagEvents;
    }

    // lvl 4 => <span>#Portrait</span>
    createTagValue = function (parent, tagName) {
        let tagValue = document.createElement('span');
        tagValue.textContent = '#' + tagName;
        parent.appendChild(tagValue);
        return tagValue;
    }

    // lv2 => <div class="card--contact">
    createCardContact = function (parent) {
        let cardContact = document.createElement('div');
        cardContact.classList.add('card--contact');
        parent.appendChild(cardContact);
        return cardContact;
    }

    // lv3 => <button class="modal--open btn btn--contact">Contactez-moi</button>
    createBtnContact = function (parent) {
        let btnContact = document.createElement('button');
        btnContact.classList.add('modal--open', 'btn', 'btn--contact');
        btnContact.textContent = 'Contactez-moi';
        parent.appendChild(btnContact);
        return btnContact;
    }

}
