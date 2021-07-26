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
        if (this.isImage()) {
            const lien = this.createLien(media);
            const figure = this.createFigure(lien);
            this.createImg(figure);
            const figCaption = this.createFigCaption(figure);
            this.createSpanTitle(figCaption);
            this.createSpanLike(figCaption);
        } else {
            const figure = this.createFigure(media);
            const video = this.createVideo(figure);
            this.createVideoSource(video);
            this.createVideoText(video);
            const figCaption = this.createFigCaption(figure);
            this.createSpanTitle(figCaption);
            this.createSpanLike(figCaption);
        }
        parent.appendChild(media);
        return media;


    }

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

    // <video controls>
    createVideo = function(parent) {
        let video = document.createElement('video');
        video.setAttribute("controls","controls");
        parent.appendChild(video);
        return video;
    }

    // <source src="xxx.mp4" type="video/mp4">
    createVideoSource = function(parent) {
        let source = document.createElement('source')
        source.setAttribute("src", "./public/media/" + this.photographerId + "/" + this.video);
        source.setAttribute("type", "video/mp4");
        parent.appendChild(source);
        return source;
    }

    // <p>Votre navigateur ne prend pas en charge les vidéos HTML5. <a href="xxx.mp4">Lien pour télécharger la vidéo</a></p>
    createVideoText = function(parent) {
        let p = document.createElement('p')
        p.textContent = "Votre navigateur ne prend pas en charge les vidéos HTML5.";
        
        let lien = document.createElement('a')
        lien.setAttribute("href", "./public/media/" + this.photographerId + "/" + this.video);
        lien.setAttribute("alt", "Lien pour télécharger la vidéo");
        lien.textContent = "Lien pour télécharger la vidéo: ";
        p.appendChild(lien);

        parent.appendChild(p);
        return p;
    }

    // <figcaption>
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