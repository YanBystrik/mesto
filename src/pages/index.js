
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
    validateObject,
    profileAvatar
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css'; 

//Экземпляр API
const api = new Api('https://nomoreparties.co/v1/cohort-28', profileName, profileJob);

//Подгружаем инфо пользователя с сервера
api.getUserInfo()
.then(res => {
  profileName.textContent = res.name;
  profileJob.textContent = res.about;
  profileAvatar.src = res.avatar;
})
.catch(err => {
  console.error(err);
});

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
    api.updateUserInfo(profileName, profileJob);
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
  };

  //Создание карточки из коробки
  const cardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      const cardLikesCount = cardElement.querySelector('.element__like-count');
      cardLikesCount.textContent = item.likes.length;
      const deleteButton = cardElement.querySelector('.element__delete');
      deleteButton.addEventListener('click', () => {
        deleteSample.open();
      })
      cardList.addItem(cardElement, 'append');
    }
  }, cardContainer);
  


//Подгружаем карточки с сервера
api.getCards()
.then(arrayCards => {
  cardList.renderItems(arrayCards);
})
.catch(err => {
  console.error(err);
})

//Экземепляр класса модалки с картинкой
const cardImagePopup = new PopupWithImage('.popup_image');
cardImagePopup.setEventListeners()

//Экземпляр модалки Нового Места
const createSample = new PopupWithForm({
  popupSelector: ".popup_create",
  handleSubmitForm: (data) => {
    const cardObj = {};
    cardObj.name = data.cardName;
    cardObj.link = data.cardUrl;
    api.updateCards(cardObj.name, cardObj.link)
    const card = createCard(cardObj);
    cardList.addItem(card, 'prepend');
    createSample.close();
  }
});
createSample.setEventListeners();
createPopupOpenButton.addEventListener("click", function (evt) {
  validFormCreate.resetValidation();
  createSample.open();
});

const deleteSample = new PopupWithForm({
  popupSelector: ".popup_delete",
  handleSubmitForm: () => {
    deleteSample.close();
  }
});
deleteSample.setEventListeners();


// Экземпляры класса для валидации форм
const validFormCreate = new FormValidator(validateObject, formCreate);
validFormCreate.enableValidation();
const validFormProfile = new FormValidator(validateObject, formProfile);
validFormProfile.enableValidation();