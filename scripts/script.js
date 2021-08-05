// Открыть попап
let profileEdit = document.querySelector ('.profile__edit-button');

function func () {
   let popupOpened = document.querySelector('.popup'); 
   popupOpened.classList.add ('popup_opened');

   let popupName = document.querySelector('.profile__title');
   let popupJob = document.querySelector('.profile__subtitle');

   let nameInput = document.querySelector('.popup__text_input_name');
   let nameJob = document.querySelector('.popup__text_input_job');

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
let nameInput = formElement.querySelector('.popup__text_input_name');
let jobInput = formElement.querySelector('.popup__text_input_job');

function formSubmitHandler (evt) {
    evt.preventDefault();

    
    let nameChange = document.querySelector('.profile__title');
    nameChange.textContent = nameInput.value;
    
    let jobChange = document.querySelector('.profile__subtitle');
    jobChange.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


//Окно добавления фото - открыть
let cardInit = document.querySelector('.profile__add-button');

function addFunc () {
   let cardInitOpened = document.querySelector('.popup-add'); 
   cardInitOpened.classList.toggle('popup-add_opened');
}

cardInit.addEventListener('click', addFunc);


//Окно добавления фото - закрыть
let closeAddButton = document.querySelector ('.popup-add__close');

function closeAddFunc () {
    
    let popupClosed = document.querySelector ('.popup-add');
    popupClosed.classList.remove ('popup-add_opened');
    let inputName = document.querySelector('.popup-add__text_input_name').value = '';
    let inputUrl = document.querySelector('.popup-add__text_input_url').value = '';

}

closeAddButton.addEventListener('click', closeAddFunc);



//Массив фотокарт
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  // Функция добавления фото из массива
  function addCard(item){
    const elementTemplate = document.querySelector('#element').content;
    const element = document.querySelector('.elements');
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    
     //Открыть картинку   
        const openPreviewImg = elementCard.querySelector ('.element__image').addEventListener('click', function (evt){
        document.querySelector('.popup_element').classList.add('popup_opened');
        document.querySelector('.popup_element_image').src = item.link;
        document.querySelector('.popup_element_title').textContent = item.name;

    });

    //Закрыть картинку
        const closePreviewImg = document.querySelector('.popup__close_element').addEventListener('click', function (evt){
          document.querySelector('.popup_element').classList.remove('popup_opened');
        });

    // Лайк
        const likeActive = elementCard.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    //Удаление
    const deleteCard = elementCard.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
    });

    elementCard.querySelector('.element__image').src = item.link;
    elementCard.querySelector('.element__title').textContent = item.name;
    
    element.prepend(elementCard);

   }

  initialCards.forEach(function (item){
   addCard(item);
});

// Добавление фото в массив
let addNew = document.querySelector('.popup-add__submit').addEventListener('click', function (evt){
  evt.preventDefault();
   let card = new Object ();
   card.name = document.querySelector('.popup-add__text_input_name').value;
   card.link = document.querySelector('.popup-add__text_input_url').value;
   initialCards.unshift(card);
   addCard(card);
   closeAddFunc();

});