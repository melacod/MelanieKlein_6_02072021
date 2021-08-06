import { Template } from './template.js';

export { PhotographerFactory };

// class with photographer attributes
class Photographer {

    constructor ({id, name, portrait, city, country, price, tagline, tags}){
        this.id = id;
        this.name = name;
        this.portrait = portrait;
        this.city = city;
        this.country = country;
        this.price = price;
        this.tagline = tagline;
        this.tags = tags;
        this.score = 0;
    }

    // display a photographer card
    displayCard = async function () {
        await this.computeHtmlTags();
        return await Template.fillTemplate("photographer-card", this);
    }

    // display an horizontal card of the photographer
    displayHorizontalCard = async function () {
        await this.computeHtmlTags();
        return await Template.fillTemplate("photographer-card-horizontal", this);
    }

    // compute html tags for the photographer
    computeHtmlTags = async function () {
        let htmlTags = "";
        for (const tag of this.tags) {
            htmlTags += await Template.fillTemplate("tag", { tagName: tag, tagClass: "tag--disabled" });
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
