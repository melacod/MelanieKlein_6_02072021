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
        this.date = this.computeDate(date);
        this.price = price;
    }

    // compute string date to object date
    computeDate = function (strDate) {
        let parts = strDate.split('-');
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }

    displayMediaTemplate = async function () {
        if (this.image != undefined) {
            return await fillTemplate("media-photo", this);
        } else {
            return await fillTemplate("media-video", this);
        }
    }

}