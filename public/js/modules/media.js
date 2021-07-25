export { loadMedias, Media };

function loadMedias (data) {
    const medias = [];
    for (let media of data.media){
        const mediaObj = new Media(media.id, media.photographerId, media.title, media.image, media.video, media.tags, media.likes, media.date, media.price);
        medias.push(mediaObj);
    }
    return medias;
}

class Media {

    constructor (id, photographerId, title, image, video, tags, likes, date, price) {
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

    isImage = function() {
        return this.video == undefined;
    }

    displayMedia = function (parent) {
        const photo = this.createPhoto (parent);
        const lien = this.createLien(photo);
        const figure = this.createFigure(lien);
        this.createImg(figure);
        this.createFigCaption(figure);
        parent.appendChild(photo);
        return photo;


    }
    /*
    <div class="photo lightBox--open">
        <a>
            <figure>
                <img src="./public/img/photos/MimiKeel/Animals_Rainbow.jpg" />
                <figcaption>Arc-en-ciel</figcaption>
            </figure>
        </a>
    </div>
    */

    // <div class="photo lightBox--open">
    createPhoto = function (parent) {
        let photo = document.createElement("div");
        photo.classList.add('photo', 'lightBox--open');
        parent.appendChild(photo);
        return photo;
    }

    // <a>
    createLien = function(parent) {
        let lien = document.createElement('a');
        parent.appendChild(lien);
        return lien;
    }

    // <figure>
    createFigure = function(parent) {
        let figure = document.createElement('figure');
        parent.appendChild(figure);
        return figure;
    }

    // <img src=? />
    createImg = function(parent) {
        let img = document.createElement('img');
        img.setAttribute("src", "./public/img/photos/" + this.photographerId + "/" + this.image);
        img.setAttribute("alt", this.title);
        parent.appendChild(img);
        return img;
    }

    // <figcaption>Portrait du mercredi</figcaption>
    createFigCaption = function(parent) {
        let figCaption = document.createElement('figcaption');
        figCaption.textContent = this.title;
        parent.appendChild(figCaption);
        return figCaption;
    }
}