import { fillTemplate } from './template.js';

export { loadPhotographers, Photographer };

function loadPhotographers (data) {
    const photographers = [];
    for (let photographer of data.photographers){
        const photographerObj = new Photographer(photographer);
            photographers.push(photographerObj);
    }
    return photographers;
}
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
    }

    displayCardTemplate = async function () {
        await this.computeHtmlTags();
        return await fillTemplate("photographer-card", this);
    }

    displayHorizontalCardTemplate = async function () {
        await this.computeHtmlTags();
        return await fillTemplate("photographer-card-horizontal", this);
    }

    computeHtmlTags = async function () {
        let htmlTags = "";
        for (const tag of this.tags) {
            htmlTags += await fillTemplate("tag", { tagName: tag });
        }
        this.htmlTags = htmlTags;
    }

}
