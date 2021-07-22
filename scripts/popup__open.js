let profileEdit = document.querySelector ('.profile__edit-button');

function func () {
   let popupOpened = document.querySelector('.popup');
   popupOpened.classList.add ('popup_opened');
}

profileEdit.addEventListener('click',func);
 