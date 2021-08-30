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
        document.addEventListener('keyup', function (event) { this.keyUpLightBoxDialog(event)}.bind(this));
    }

    // add dynamic events: html re generated
    addDynamicEvents () {
        // DOM elements
        const btnOpens = document.querySelectorAll('.lightBox--open');
    
        // add listener events to lightBox
        for (let btnOpen of btnOpens) {
            btnOpen.addEventListener("click", function (event) { this.openLightBoxDialog(event)}.bind(this));
            btnOpen.addEventListener('keyup', function(event) {this.enterOpenLightBoxDialog(event)}.bind(this));
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
        lightBox.querySelector('img,video').focus();
    }

    // add event keyup to open lightbox when enter pressed
    enterOpenLightBoxDialog (event) {
        if (event.key === "Enter") {
            this.openLightBoxDialog (event);
        }
    }

    // add event keyup for lightbox
    // - escape pressed = close lightbox
    // - left pressed = previous
    // - right pressed = next
    keyUpLightBoxDialog (event) {
        const lightBox = document.querySelector('.lightBox');
        if (lightBox.style.display != "none") {
            
            if (event.key === "Escape") {
                this.closeLightBoxDialog();
            
            } else if (event.key === "ArrowLeft") {
                this.previousLightBoxDialog ();
            
            } else if (event.key === "ArrowRight") {
                this.nextLightBoxDialog ();
            }
        }
    }

    // close lightBox dialog
    closeLightBoxDialog () {
        const lightBox = document.querySelector('.lightBox');
        lightBox.style.display = "none";
    }

    // display next media lightbox dialog
    nextLightBoxDialog () {

        // Get index of current dismlayed media from medias array
        let mediaIndex = this.findMediaIndex();
        
        // Variable for next media to display
        let nextMedia = undefined;
        
        // Take first media if 
        // - media not found in medias array (should never happen)
        // - current media is the last in the medias array
        if (mediaIndex == -1 || mediaIndex == this.medias.length - 1) {
            nextMedia = this.medias[0];
        
        // Take next media from medias array
        } else {
            nextMedia = this.medias[mediaIndex + 1];
        }

        // Update currently display media id
        this.id = nextMedia.id;

        // display next media in lightbox
        this.display (nextMedia);
    }

    // display previous media lightbox dialog
    previousLightBoxDialog () {
        
        // Get index of current dismlayed media from medias array
        let mediaIndex = this.findMediaIndex();
        
        // Variable for previous media to display
        let previousMedia = undefined;
        
        // Take last media if 
        // - media not found in medias array (should never happen)
        // - current media is the first in the medias array
        if (mediaIndex == -1 || mediaIndex == 0) {
            previousMedia = this.medias[this.medias.length - 1];
        
        // Take previous media from medias array
        } else {
            previousMedia = this.medias[mediaIndex - 1];
        }

        // Update currently display media id
        this.id = previousMedia.id;

        // display next media in lightbox
        this.display (previousMedia);
    }
    
    // Return the media index from medias array from the current displayed media
    findMediaIndex () {
        return this.medias.findIndex( (media) => this.id == media.id );
    }

    // display media in lightbox
    display (media) {
        const genLightBoxMedia = document.querySelector('.lightBox--media');
        genLightBoxMedia.innerHTML = "";
        genLightBoxMedia.insertAdjacentHTML('beforeend', media.displayForLightBox());
    }

}

