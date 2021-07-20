export { CardFactory };

class CardFactory {

    // lvl 1 => <div class="card">
    createCard = function (cardClass) {
        let card = document.createElement("div");
        card.classList.add('card');
        if (cardClass !== undefined) {
            card.classList.add(cardClass);
        }
        return card;
    }

    // lvl 2 => <div class="card--info">
    createCardInfo = function(card) {
        let cardInfo = document.createElement('div');
        cardInfo.classList.add('card--info');
        card.appendChild(cardInfo);
        return cardInfo;
    }

    // lvl 2 =>  <a class="card--link" href="photographer.html" alt="Mimi Keel">
    createCardLink = function (card, cardLinkName, cardId) {
        let cardLink = document.createElement("a");
        cardLink.classList.add('card--link');
        cardLink.setAttribute('href', "photographer.html?id=" + cardId);
        cardLink.setAttribute('alt', cardLinkName);
        card.appendChild(cardLink);
        return cardLink;
    }
    
    // lvl 3 => <img class="card--image" src="./public/img/photos/MimiKeel/Portrait_Nora.jpg" alt="" />
    createCardImage = function (cardLink, cardImageName) {
        let cardImage = document.createElement("img");
        cardImage.classList.add('card--image');
        cardImage.setAttribute("src", "./public/img/photos/Photographers_ID/" + cardImageName);
        cardImage.setAttribute("alt", cardImageName);
        cardLink.appendChild(cardImage);
        return cardImage;
    }

    // lvl 3 => <h2 class="card--name">Mimi Keel</h2>
    createCardName = function (cardLink, cardText) {
        let cardName = document.createElement('h2');
        cardName.classList.add('card--name');
        cardName.textContent = cardText;
        cardLink.appendChild(cardName);
        return cardName;
    }

    // lvl 2 => <div class="card--localisation">London, UK</div>
    createCardLocalisation = function (card, cardLocalisationCity, cardLocalisationCountry){
        let cardLocalisation = document.createElement('div');
        cardLocalisation.classList.add('card--localisation');
        cardLocalisation.textContent = cardLocalisationCity + ', ' + cardLocalisationCountry;
        card.appendChild(cardLocalisation);
        return cardLocalisation;
    }

    // lvl 2 => <div class="card--description">Voir le beau dans le quotidien</div>
    createCardDescription = function (card, cardDescriptionText ){
        let cardDescription = document.createElement('div');
        cardDescription.classList.add('card--description');
        cardDescription.textContent = cardDescriptionText;
        card.appendChild(cardDescription);
        return cardDescription;
    }

    // lvl 2 => <div class="card--price">400€/jour</div>
    createCardPrice = function (card, cardPriceText){
        let cardPrice = document.createElement('div');
        cardPrice.classList.add('card--price');
        cardPrice.textContent = cardPriceText + "€/jour";
        card.appendChild(cardPrice);
        return cardPrice;
    } 

    // lvl 2 => <nav class="card--nav tags" aria-label="Card tag navigation">
    createCardTags = function (card){
        let cardTags = document.createElement('nav');
        cardTags.classList.add('card--nav');
        cardTags.classList.add('tags');
        cardTags.setAttribute("aria-label", "Card tag navigation");
        card.appendChild(cardTags);
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

}
