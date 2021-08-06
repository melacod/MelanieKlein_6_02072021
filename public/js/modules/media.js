import { Utils } from './utils.js';
import { Template } from './template.js';

export { MediaFactory };

// super class with common media attributes / functions
class Media {

    constructor ({id, photographerId, title, tags, likes, date, price}) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.tags = tags;
        this.likes = likes;
        this.date = Utils.computeDate(date);
        this.price = price;
    }

    // add display method for photo and video media
    display = async function () {
        return await Template.fillTemplate(this.templateName, this);
    }

}

// class for video media
class Video extends Media {

    constructor ({id, photographerId, title, video, tags, likes, date, price}) {
        super({id, photographerId, title, tags, likes, date, price});
        this.video = video;
        this.templateName = "media-video";
    }

}

// class for photo media
class Photo extends Media {

    constructor ({id, photographerId, title, image, tags, likes, date, price}) {
        super({id, photographerId, title, tags, likes, date, price});
        this.image = image;
        this.templateName = "media-photo";
    }

}

// factory to create media (photo or video)
class MediaFactory {

    // create a media (use factory method pattern = use the target class depending on the type of the media)
    static createMedia = function (media) {
        let mediaObj;
        if (media.video !== undefined) {
            // media is a video => use Video class
            mediaObj = new Video (media);
        } else {
            // media is a photo => use Photo class
            mediaObj = new Photo (media);
        }
        return mediaObj;
    }

    // create an array of medias
    static createMedias (medias) {
        const mediasObj = [];
        for (let media of medias){
            const mediaObj = MediaFactory.createMedia(media);
            mediasObj.push(mediaObj);
        }
        return mediasObj;
    }

}