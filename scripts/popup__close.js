let closeButton = document.querySelector ('.popup__close');

function closePopup () {
    let popupClosed = document.querySelector ('.popup');
    popupClosed.classList.remove ('popup_opened');
}

closeButton.addEventListener('click', closePopup);