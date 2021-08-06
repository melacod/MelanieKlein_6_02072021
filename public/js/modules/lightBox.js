export { LightBox };

// light box manager
class LightBox {

    // add events to light box DOM elements
    static addLightBoxEvents () {

        // DOM elements
        const lightBoxOpenButtons = document.querySelectorAll('.lightBox--open');
        const lightBoxCloseButton = document.querySelector('.lightBox--close');
    
        // add listener events to lightBox
        for (let lightBoxOpenButton of lightBoxOpenButtons) {
            lightBoxOpenButton.addEventListener("click", LightBox.openLightBoxDialog);
        }
        lightBoxCloseButton.addEventListener("click", LightBox.closeLightBoxDialog);
    }
    
    // open lightBox dialog
    static openLightBoxDialog () {
        const lightBox = document.querySelector('.lightBox');
        lightBox.style.display = "block";
    }

    // close lightBox dialog
    static closeLightBoxDialog () {
        const lightBox = document.querySelector('.lightBox');
        lightBox.style.display = "none";
    }
    
}

