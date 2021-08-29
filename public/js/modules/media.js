import { Utils } from './utils.js';
import { Template } from './template.js';

export { MediaFactory };

// super class with common media attributes / functions
class Media {

    constructor ({id, photographerId, title, tags, likes, date, price}) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title
        this.tags = tags;
        this.likes = likes;
        this.date = Utils.computeDate(date);
        this.price = price;
        this.score = -1; // displayed when no filter tag selected
        this.likedClass = "far fa-heart";
    }

    // add display method for photo and video media
    display () {
        return Template.fillTemplate(this.templateName, this);
    }

    // add display method for lightbox media
    displayForLightBox () {
        return this.display();
    }

}

// class for video media
class Video extends Media {

    constructor ({id, photographerId, title, video, tags, likes, date, price}) {
        super({id, photographerId, title, tags, likes, date, price});
        this.video = video;
        this.templateName = "media-video";
        this.controls = "";
    }

    // add display method for lightbox video media
    displayForLightBox () {
        this.controls = "controls";
        let content = Template.fillTemplate(this.templateName, this);
        this.controls = "";
        return content;
    }

}

// class for photo media
class Photo extends Media {

    constructor ({id, photographerId, title, altText, image, tags, likes, date, price}) {
        super({id, photographerId, title, tags, likes, date, price});
        this.image = image;
        this.altText = altText;
        this.templateName = "media-photo";
    }

}

// factory to create media (photo or video)
class MediaFactory {

    // create a media (use factory method pattern = use the target class depending on the type of the media)
    static createMedia (media) {
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

}