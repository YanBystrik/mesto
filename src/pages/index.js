
// Импорт из модулей
import { 
    profileEdit,
    nameInput,
    jobInput,
    profileName,
    profileJob,
    cardContainer,
    createPopupOpenButton,
    formCreate,
    formProfile,
    initialCards,
    validateObject 
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css'; 

//Функционал модалки Профиля
const userInfo = new UserInfo({
  profileTitle: profileName,
  profileSubtitle: profileJob
}); 

const setInfo = () => {
  const userItems = userInfo.getUserInfo();
  nameInput.value = userItems.profileName;
  jobInput.value = userItems.profileJob;
}

//Экземпляр модалки Профиля
const profileSample = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    profileSample.close();
  }
});
profileSample.setEventListeners();

profileEdit.addEventListener("click", () => {
  setInfo();
  validFormProfile.resetValidation();
  profileSample.open();
});

//Функция создания экземпляров Card
const createCard = (item) => {
  const card = new Card({
    data: item, 
    handleCardClick: () => {
      cardImagePopup.open(item);
    }
  }, '#element');
  return card.generate();
}

//Создание карточки из коробки
const cardImagePopup = new PopupWithImage('.popup_image');
cardImagePopup.setEventListeners()

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, cardContainer);

cardList.renderItems();

//Экземпляр модалки Нового Места
const createSample = new PopupWithForm({
  popupSelector: ".popup_create",
  handleSubmitForm: (data) => {
    const cardObj = {};
    cardObj.name = data.cardName;
    cardObj.link = data.cardUrl;
    const cardElement = createCard(cardObj);
    cardList.addItem(cardElement);
    createSample.close();
  }
});
createSample.setEventListeners();
createPopupOpenButton.addEventListener("click", function (evt) {
  validFormCreate.resetValidation();
  createSample.open();
});

// Экземпляры класса для валидации форм
const validFormCreate = new FormValidator(validateObject, formCreate);
validFormCreate.enableValidation();
const validFormProfile = new FormValidator(validateObject, formProfile);
validFormProfile.enableValidation();