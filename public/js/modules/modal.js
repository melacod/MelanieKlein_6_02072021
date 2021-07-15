// ---------------------------------------------------------------------------------------------------------
// DOM elements
// ---------------------------------------------------------------------------------------------------------
const modal = document.querySelector('.modal');
const modalOpenButtons = document.querySelectorAll('.modal--open');
const modalCloseButton = document.querySelector('.modal--close');

// add listener events to modal
for (let modalOpenButton of modalOpenButtons) {
    modalOpenButton.addEventListener("click", openModalDialog);
}
modalCloseButton.addEventListener("click", closeModalDialog);

// close modal dialog
function closeModalDialog() {
    modal.style.display = "none";
}

// open modal dialog
function openModalDialog() {
    modal.style.display = "block";
}
