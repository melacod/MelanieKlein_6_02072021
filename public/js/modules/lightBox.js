// ---------------------------------------------------------------------------------------------------------
// DOM elements
// ---------------------------------------------------------------------------------------------------------
const modal = document.querySelector('.lightBox');
const modalCloseButton = document.querySelector('.btn--close');
const modalOpenButton = document.getElementsByClassName('.photo');

// add listener events to lightBox
modalCloseButton.addEventListener("click", closeLightBoxDialog);
modalOpenButton.addEventListener("click", openLightBoxDialog);

// close lightBox dialog
function closeLightBoxDialog() {
    modal.style.display = "none";
}

// open lightBox dialog
function openLightBoxDialog() {
    modal.style.display = "block";
}