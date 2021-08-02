export { addModalEvents };

function addModalEvents() {

    // DOM elements
    const modalOpenButton = document.querySelector('.modal--open');
    const modalCloseButton = document.querySelector('.modal--close');

    // add listener events to modal
    modalOpenButton.addEventListener("click", openModalDialog);
    modalCloseButton.addEventListener("click", closeModalDialog);
}

// close modal dialog
function closeModalDialog() {
    const modal = document.querySelector('.modal');
    modal.style.display = "none";
    const modalOpenButton = document.querySelector('.modal--open');
    modalOpenButton.style.display = "block";
}

// open modal dialog
function openModalDialog() {
    const modal = document.querySelector('.modal');
    modal.style.display = "block";
    const modalOpenButton = document.querySelector('.modal--open');
    modalOpenButton.style.display = "none";
}
