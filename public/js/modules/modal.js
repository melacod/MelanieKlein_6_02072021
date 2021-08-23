export { Modal };

// modal manager
class Modal {

    // add events to modal DOM elements
    static addModalEvents () {

        // DOM elements
        const modalOpenButton = document.querySelector('.modal--open');
        const modalCloseButton = document.querySelector('.modal--close');
        const modalSendButton = document.querySelector('.modal--send');
        
        // add listener events to modal
        modalOpenButton.addEventListener("click", Modal.openModalDialog);
        modalCloseButton.addEventListener("click", Modal.closeModalDialog);
        modalSendButton.addEventListener("click", Modal.sendMessageModalDialog);
        document.addEventListener('keyup', Modal.keyupModalDialog)
    }
    
    // close modal dialog
    static closeModalDialog () {
        const modal = document.querySelector('.modal');
        modal.style.display = "none";
        const modalOpenButton = document.querySelector('.modal--open');
        modalOpenButton.style.display = "block";
    }
    
    // open modal dialog
    static openModalDialog () {
        const modal = document.querySelector('.modal');
        modal.style.display = "block";
        const modalOpenButton = document.querySelector('.modal--open');
        modalOpenButton.style.display = "none";
    }

    // check if press enter in modal
    static keyupModalDialog (event) {
        const modal = document.querySelector('.modal');
        if (modal.style.display != "none" && event.key === "Escape") {
            Modal.closeModalDialog();
        }
    }

    // Send a message from modal dialog and close it
    static sendMessageModalDialog () {
        let firstName = document.querySelector('.modal #first');
        let lastName = document.querySelector('.modal #last');
        let email = document.querySelector('.modal #email');
        let message = document.querySelector('.modal #message');
        
        console.log("Sending message ...");
        console.log("First name: " + firstName.value);
        console.log("Last name: " + lastName.value);
        console.log("Email: " + email.value);
        console.log("Message: " + message.value);
        
        Modal.closeModalDialog();
    }
}

