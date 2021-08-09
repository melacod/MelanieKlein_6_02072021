import { Template } from './template.js';

export { PhotographerFactory };

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
    displayCard = async function () {
        await this.computeHtmlTags("tag--disabled");
        return await Template.fillTemplate("photographer-card", this);
    }

    // display an horizontal card of the photographer
    displayHorizontalCard = async function () {
        await this.computeHtmlTags("tag--enabled");
        return await Template.fillTemplate("photographer-card-horizontal", this);
    }

    // display photographer informations
    displayFloatingInfos = async function () {
        return await Template.fillTemplate("photographer-infos", this);
    }

    // compute html tags for the photographer
    computeHtmlTags = async function (tagClassValue) {
        let htmlTags = "";
        for (const tag of this.tags) {
            htmlTags += await Template.fillTemplate("tag", { tagName: tag, tagClass: tagClassValue });
        }
        this.htmlTags = htmlTags;
    }

}

// factory to create photographers
class PhotographerFactory {

    static createPhotographers (photographers) {
        const photographersObj = [];
        for (let photographer of photographers){
            const photographerObj = new Photographer(photographer);
            photographersObj.push(photographerObj);
        }
        return photographersObj;
    }

}
