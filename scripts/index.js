const profileEdit = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const profileContainer = document.querySelector(".popup__container_profile");
const profilePopupCloseButton = document.querySelector(".popup__close_profile");
const nameInput = profileContainer.querySelector(".popup__input_text_name");
const jobInput = profileContainer.querySelector(".popup__input_text_job");
const popupInput = document.querySelector(".popup__input");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
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
const popupInputTextPlace = document.querySelector(".popup__input_text_place");
const popupInputTextUrl = document.querySelector(".popup__input_text_url");
const popupCloseImage = document.querySelector(".popup__close_image");
const popupImage = document.querySelector(".popup_image");

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

// Объект настроек для валидации
const validateObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_invalid",
  errorClass: "error_active",
};

// Импорт из модулей
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

//Функционал модалки профиля
const userInfo = new UserInfo({
  profileTitle: profileName,
  profileSubtitle: profileJob
}); 

const userItems = userInfo.getUserInfo();
const setInfo = () => {
  nameInput.value = userItems.title;
  jobInput.value = userItems.subtitle;
}

const profileSample = new PopupWithForm({
  popupSelector: popupProfile,
  form: formProfile,
  inputList: inputListProfile,
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    profileSample.close();
  }
});
profileSample.setEventListeners();

profileEdit.addEventListener("click", () => {
  setInfo();
  validFormProfile.toggleButtonState();
  validFormProfile.hideInputError(nameInput);
  validFormProfile.hideInputError(jobInput);
  profileSample.open();
});

// // Открыть попап профиля
// profileEdit.addEventListener("click", () => {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   validFormProfile.toggleButtonState();
//   validFormProfile.hideInputError(nameInput);
//   validFormProfile.hideInputError(jobInput);
//   profileSample.setEventListeners();
//   profileSample.open();
// });

// // Сохранить изменения профиля
// formProfile.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   profileSample.close();
// });

// // Окно добавления фото - открыть
// createPopupOpenButton.addEventListener("click", function (evt) {
//   formCreate.reset()
//   validFormCreate.toggleButtonState();
//   validFormCreate.hideInputError(placeInput);
//   validFormCreate.hideInputError(urlInput);
//   createSample.setEventListeners();
//   createSample.open();
// });

//Создание карточки из коробки
const cardImagePopup = new PopupWithImage(popupImage);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item, 
      handleCardClick: () => {
        cardImagePopup.open(item);
      }
    }, '.element');
    const cardElement = card.generate();
    cardList.addItem(cardElement);
  }
}, cardContainer);

cardList.renderItems();

// // Добавляем карточку в DOM
// function addCard(card) {
//   const elementCard = card.generate();
//   cardContainer.prepend(elementCard);
// }

// // Добавление фото в массив
// formCreate
//   .addEventListener("submit", (evt) => {
//     evt.preventDefault();
//     const cardObj = {};
//     cardObj.name = popupInputTextPlace.value;
//     cardObj.link = popupInputTextUrl.value;
//     const card = new Card({
//       data: cardObj, 
//       handleCardClick: () => {
//         cardImagePopup.open(cardObj);
//       } 
//     }, '.element');
//     popupInputTextPlace.value = '';
//     popupInputTextUrl.value = '';
//     addCard(card);
//     createSample.close();
//   });

//Экземпляры модалок
const createSample = new PopupWithForm({
  popupSelector: popupCreate,
  form: formCreate,
  inputList: inputListCreate,
  handleSubmitForm: () => {
    const cardObj = {};
    cardObj.name = popupInputTextPlace.value;
    cardObj.link = popupInputTextUrl.value;
    const card = new Card({
      data: cardObj, 
      handleCardClick: () => {
        cardImagePopup.open(cardObj);
      } 
    }, '.element');
    const cardElement = card.generate();
    cardList.addItem(cardElement);
    createSample.close();
  }
});
createSample.setEventListeners();
createPopupOpenButton.addEventListener("click", function (evt) {
  validFormCreate.toggleButtonState();
  validFormCreate.hideInputError(placeInput);
  validFormCreate.hideInputError(urlInput);
  createSample.open();
});

// Экземпляры класса для валидации форм
const validFormCreate = new FormValidator(validateObject, formCreate);
validFormCreate.enableValidation();
const validFormProfile = new FormValidator(validateObject, formProfile);
validFormProfile.enableValidation();