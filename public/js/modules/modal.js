// ---------------------------------------------------------------------------------------------------------
// DOM elements
// ---------------------------------------------------------------------------------------------------------
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.btn--close');
const modalOpenButton = document.querySelector('.btn--contact');

// add listener events to modal
modalCloseButton.addEventListener("click", closeModalDialog);
modalOpenButton.addEventListener("click", openModalDialog);


// close modal dialog
function closeModalDialog() {
    modal.style.display = "none";
}

// open modal dialog
function openModalDialog() {
    modal.style.display = "block";
}
