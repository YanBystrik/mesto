const profileEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const profileContainer = document.querySelector(".popup__container_profile");
const profilePopupCloseButton = document.querySelector(".popup__close_profile");
const nameInput = profileContainer.querySelector(".popup__input_text_name");
const jobInput = profileContainer.querySelector(".popup__input_text_job");
const popupInput = document.querySelector(".popup__input");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const popupImage = document.querySelector(".popup_image");
const elementTemplate = document.querySelector("#element").content;
const cardContainer = document.querySelector(".elements");
const createPopupOpenButton = document.querySelector(".profile__add-button");
const popupCreate = document.querySelector(".popup_create");
const closeAddButton = document.querySelector(".popup__close_create");
const popupSubmitCreate = document.querySelector(".popup__submit_create");
const popupSubmitProfile = document.querySelector(".popup__submit_profile")
const closePopupImage = document.querySelector(".popup_image");
const formCreate = document.forms.create;
const formProfile = document.forms.profile;
const inputListCreate = Array.from(formCreate.querySelectorAll('.popup__input'));
const inputListProfile = Array.from(formProfile.querySelectorAll('.popup__input'));
const placeInput = document.querySelector(".popup__input_text_place");
const urlInput = document.querySelector(".popup__input_text_url");
const popupViewerImage = document.querySelector(".popup__viewer_image");
const popupViewerTitle =  document.querySelector(".popup__viewer_title");
const popupInputTextPlace = document.querySelector(".popup__input_text_place");
const popupInputTextUrl = document.querySelector(".popup__input_text_url");
const popupCloseImage = document.querySelector(".popup__close_image");

// Экспорт в модули FormValidator и Card
export {
  elementTemplate, 
  popupViewerImage, 
  popupViewerTitle,
  closeByEscape,
  popupImage, 
  validateObject
};

// Импорт из модулей
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа
function closePopup(popupHide) {
  popupHide.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

// Открыть попап профиля
profileEdit.addEventListener("click", function (evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validFormProfile.toggleButtonState();
  validFormProfile.hideInputError(nameInput);
  validFormProfile.hideInputError(jobInput);
  openPopup(popupProfile);
});

// Сохранить изменения профиля
profileContainer.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
});

// Окно добавления фото - открыть
createPopupOpenButton.addEventListener("click", function (evt) {
  formCreate.reset()
  validFormCreate.hideInputError(placeInput);
  validFormCreate.hideInputError(urlInput);
  openPopup(popupCreate);
});

// Массив фотокарт
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Добавляем карточку в DOM
function addCard(card) {
  const elementCard = card.generate();
  cardContainer.prepend(elementCard);
}

// Добавление фото в массив
formCreate
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    const cardObj = {};
    cardObj.name = popupInputTextPlace.value;
    cardObj.link = popupInputTextUrl.value;
    const card = new Card(cardObj, '.element');
    popupInputTextPlace.value = '';
    popupInputTextUrl.value = '';
    addCard(card);
    closePopup(popupCreate);
  });

// Закрыть попап ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрыть попап
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);   
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    });
});

// Создание карточки из коробки
initialCards.forEach((item) => {
  const card = new Card(item, '.element');
  const cardItem = card.generate();

  cardContainer.prepend(cardItem);
});

// Объект настроек для валидации
const validateObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_invalid",
  errorClass: "error_active",
};

// Экземпляры класса для валидации форм
const validFormCreate = new FormValidator(validateObject, formCreate);
validFormCreate.enableValidation();
const validFormProfile = new FormValidator(validateObject, formProfile);
validFormProfile.enableValidation();