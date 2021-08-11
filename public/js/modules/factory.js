import { Photographer } from './photographer.js';
import { MediaFactory } from './media.js';

export { createPhotographers, createMedias };

function createPhotographers (photographers) {
    const photographersObj = [];
    for (let photographer of photographers){
        
        const photographerObj = new Photographer(photographer);
        photographersObj.push(photographerObj);
    }
    return photographersObj;
}

function createMedias (medias) {
    const mediasObj = [];
    for (let media of medias){
        const mediaObj = MediaFactory.createMedia(media);
        mediasObj.push(mediaObj);
    }
    return mediasObj;
}
