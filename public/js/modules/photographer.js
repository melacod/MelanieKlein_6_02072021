import { Template } from './template.js';

export { Photographer };

// class with photographer attributes
class Photographer {

    constructor ({id, name, portrait, altText, city, country, price, tagline, tags}){
        this.id = id;
        this.name = name;
        this.portrait = portrait;
        this.altText = altText;
        this.city = city;
        this.country = country;
        this.price = price;
        this.tagline = tagline;
        this.tags = tags;
        this.score = 0;
        this.likes = 0;
    }

    // display a photographer card
    displayCard = function () {
        this.computeHtmlTags("tag--disabled", "-1");
        return Template.fillTemplate("photographer-card", this);
    }

    // display an horizontal card of the photographer
    displayHorizontalCard = function () {
        this.computeHtmlTags("tag--enabled", "0");
        return Template.fillTemplate("photographer-card-horizontal", this);
    }

    // display photographer informations
    displayFloatingInfos = function () {
        return Template.fillTemplate("photographer-infos", this);
    }

    // compute html tags for the photographer
    computeHtmlTags = function (tagClassValue, tagTabIndexValue) {
        let htmlTags = "";
        for (const tag of this.tags) {
            htmlTags += Template.fillTemplate("tag", { tagName: tag, tagClass: tagClassValue, tagTabIndex: tagTabIndexValue });
        }
        this.htmlTags = htmlTags;
    }

}
