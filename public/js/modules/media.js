import { fillTemplate } from './template.js';

export { loadMedias, Media };

function loadMedias (data) {
    const medias = [];
    for (let media of data.media){
        const mediaObj = new Media(media);
        medias.push(mediaObj);
    }
    return medias;
}

class Media {

    constructor ({id, photographerId, title, image, video, tags, likes, date, price}) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.video = video;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }

    displayMediaTemplate = async function () {
        if (this.image != undefined) {
            return await fillTemplate("media-photo", this);
        } else {
            return await fillTemplate("media-video", this);
        }
    }

}