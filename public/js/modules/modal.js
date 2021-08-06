export { Modal };

// modal manager
class Modal {

    // add events to modal DOM elements
    static addModalEvents() {

        // DOM elements
        const modalOpenButton = document.querySelector('.modal--open');
        const modalCloseButton = document.querySelector('.modal--close');
    
        // add listener events to modal
        modalOpenButton.addEventListener("click", Modal.openModalDialog);
        modalCloseButton.addEventListener("click", Modal.closeModalDialog);
    }
    
    // close modal dialog
    static closeModalDialog() {
        const modal = document.querySelector('.modal');
        modal.style.display = "none";
        const modalOpenButton = document.querySelector('.modal--open');
        modalOpenButton.style.display = "block";
    }
    
    // open modal dialog
    static openModalDialog() {
        const modal = document.querySelector('.modal');
        modal.style.display = "block";
        const modalOpenButton = document.querySelector('.modal--open');
        modalOpenButton.style.display = "none";
    }
}

