export { LightBox };

// light box manager
class LightBox {

    constructor () {
        this.addStaticEvents();
    }

    setMedias (medias) {
        this.medias = medias;
        this.id = undefined;
        this.addDynamicEvents();
    }

    // Add static event: html elements not re generated
    addStaticEvents () {
        // DOM elements
        const btnClose = document.querySelector('.lightBox--close');
        const btnPrevious = document.querySelector(".btn--previous");
        const btnNext = document.querySelector(".btn--next");
    
        // add listener events to lightBox
        btnClose.addEventListener("click", this.closeLightBoxDialog);
        btnNext.addEventListener("click", function (event) { this.nextLightBoxDialog(event)}.bind(this));
        btnPrevious.addEventListener("click", function (event) { this.previousLightBoxDialog(event)}.bind(this));
    }

    // add dynamic events: html re generated
    addDynamicEvents () {
        // DOM elements
        const btnOpens = document.querySelectorAll('.lightBox--open');
    
        // add listener events to lightBox
        for (let btnOpen of btnOpens) {
            btnOpen.addEventListener("click", function (event) { this.openLightBoxDialog(event)}.bind(this));
        }
    }

    // open lightBox dialog
    openLightBoxDialog (event) {
        let htmlMedia = event.target;

        // Set currently display media id
        this.id = htmlMedia.dataset.id;

        // search current media to display 
        for (let media of this.medias) {
            
            // found current media to display
            if (this.id == media.id) {
                this.display(media);
                break;
            }
        }

        // Display light box
        const lightBox = document.querySelector('.lightBox');
        lightBox.style.display = "block";
    }

    // close lightBox dialog
    closeLightBoxDialog () {
        const lightBox = document.querySelector('.lightBox');
        lightBox.style.display = "none";
    }

    // display next media lightbox dialog
    nextLightBoxDialog (event) {
        this.displayNext();
    }
    
    // display previous media lightbox dialog
    previousLightBoxDialog (event) {
        this.medias.reverse();
        this.displayNext();
        this.medias.reverse();
    }

    // found next media in medias list and display it
    displayNext () {
        let foundMedia = false;
        let nextMedia = undefined;
        
        // search current media displayed 
        for (let media of this.medias) {
            
            // found current media display, take next media
            if (this.id == media.id) {
                foundMedia = true;
                continue;
            }

            // next media to display
            if (foundMedia == true) {
                nextMedia = media;
                break;
            }
        }

        // if no next media found, display first media
        if (nextMedia === undefined) {
            nextMedia = this.medias[0];
        }

        // Update currently display media id
        this.id = nextMedia.id;

        // display next media in lightbox
        this.display (nextMedia);
    }

    // display media in lightbox
    display (media) {
        const genLightBoxMedia = document.querySelector('.lightBox--media');
        genLightBoxMedia.innerHTML = "";
        genLightBoxMedia.insertAdjacentHTML('beforeend', media.displayForLightBox());
    }

}

