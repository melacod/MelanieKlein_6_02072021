export { addLightBoxEvents };

function addLightBoxEvents () {

    // DOM elements
    const lightBoxOpenButtons = document.querySelectorAll('.lightBox--open');
    const lightBoxCloseButton = document.querySelector('.lightBox--close');

    // add listener events to lightBox
    for (let lightBoxOpenButton of lightBoxOpenButtons) {
        lightBoxOpenButton.addEventListener("click", openLightBoxDialog);
    }
    lightBoxCloseButton.addEventListener("click", closeLightBoxDialog);
}

// close lightBox dialog
function closeLightBoxDialog () {
    const lightBox = document.querySelector('.lightBox');
    lightBox.style.display = "none";
}

// open lightBox dialog
function openLightBoxDialog () {
    const lightBox = document.querySelector('.lightBox');
    lightBox.style.display = "block";
}