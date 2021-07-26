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
        const media = this.createMedia (parent);
        const lien = this.createLien(media);
        const figure = this.createFigure(lien);
        this.createImg(figure);
        const figCaption = this.createFigCaption(figure);
        this.createSpanTitle(figCaption);
        this.createSpanLike(figCaption);
        parent.appendChild(media);
        return media;


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
    createMedia = function (parent) {
        let media = document.createElement("div");
        media.classList.add('media', 'lightBox--open');
        parent.appendChild(media);
        return media;
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
        img.setAttribute("src", "./public/media/" + this.photographerId + "/" + this.image);
        img.setAttribute("alt", this.title);
        parent.appendChild(img);
        return img;
    }

    // <figcaption>Portrait du mercredi</figcaption>
    /*
    <figcaption>
              <span>Arc-en-ciel</span>
              <span>12 <i class="fas fa-heart"></i></span>
            </figcaption>
    */
    createFigCaption = function(parent) {
        let figCaption = document.createElement('figcaption');
        parent.appendChild(figCaption);
        return figCaption;
    }

    // <span>Arc-en-ciel</span>
    createSpanTitle = function(parent) {
        let spanTitle = document.createElement('span');
        spanTitle.textContent = this.title;
        parent.appendChild(spanTitle);
        return spanTitle;
    }

    // <span>12 <i class="fas fa-heart"></i></span>
    createSpanLike = function(parent) {
        let spanLike = document.createElement('span');
        spanLike.textContent = this.likes + ( " " );

        let iconLike = document.createElement('i');
        iconLike.classList.add('fas', 'fa-heart');
        spanLike.appendChild(iconLike);

        parent.appendChild(spanLike);
        return spanLike;
    }
}