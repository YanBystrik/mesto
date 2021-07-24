// Открыть попап
let profileEdit = document.querySelector ('.profile__edit-button');

function func () {
   let popupOpened = document.querySelector('.popup'); 
   popupOpened.classList.add ('popup_opened');

   let popupName = document.querySelector('.profile__title');
   let popupJob = document.querySelector('.profile__subtitle');

   let nameInput = document.querySelector('.popup__text_name');
   let nameJob = document.querySelector('.popup__text_job');

   nameInput.setAttribute = ('value', popupName.textContent);
   nameJob.setAttribute = ('value', popupJob.textContent);
}

profileEdit.addEventListener('click',func);
 
//Закрыть попап
let closeButton = document.querySelector ('.popup__close');

function closePopup () {
    let popupClosed = document.querySelector ('.popup');
    popupClosed.classList.remove ('popup_opened');
}

closeButton.addEventListener('click', closePopup);


// Сохранить изменения
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__text_name');
let jobInput = formElement.querySelector('.popup__text_job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    
    let nameChange = document.querySelector('.profile__title');
    nameChange.textContent = nameInput.value;
    
    let jobChange = document.querySelector('.profile__subtitle');
    jobChange.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);