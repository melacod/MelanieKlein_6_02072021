// ---------------------------------------------------------------------------------------------------------
// DOM elements
// ---------------------------------------------------------------------------------------------------------
const modal = document.querySelector('.modal');
const modalOpenButton = document.querySelector('.modal--open');
const modalCloseButton = document.querySelector('.modal--close');

// add listener events to modal
modalOpenButton.addEventListener("click", openModalDialog);
modalCloseButton.addEventListener("click", closeModalDialog);

// close modal dialog
function closeModalDialog() {
    modal.style.display = "none";
    modalOpenButton.style.display = "block";
}

// open modal dialog
function openModalDialog() {
    modal.style.display = "block";
    modalOpenButton.style.display = "none";
}
