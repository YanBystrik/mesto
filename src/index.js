
// Импорт из модулей
import { 
    profileEdit,
    popupProfile,
    nameInput,
    jobInput,
    profileName,
    profileJob,
    cardContainer,
    createPopupOpenButton,
    popupCreate,
    formCreate,
    formProfile,
    placeInput,
    urlInput,
    popupInputTextPlace,
    popupInputTextUrl,
    popupImage,
    initialCards,
    validateObject } from "./utils/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import './styles/index.css'; 

//Функционал модалки профиля
const userInfo = new UserInfo({
  profileTitle: profileName,
  profileSubtitle: profileJob
}); 


const setInfo = () => {
  const userItems = userInfo.getUserInfo();
  nameInput.value = userItems.profile_name;
  jobInput.value = userItems.profile_job;
}

const profileSample = new PopupWithForm({
  popupSelector: popupProfile,
  form: formProfile,
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

//Экземпляры модалок
const createSample = new PopupWithForm({
  popupSelector: popupCreate,
  form: formCreate,
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