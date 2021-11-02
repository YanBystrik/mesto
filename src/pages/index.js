
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
    formAvatar,
    validateObject,
    profileAvatar,
    popupSubmitCreate,
    popupSubmitProfile,
    avatarButton,
    popupSubmitAvatar
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
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
.then(() => {
  //Подгружаем карточки с сервера
api.getCards()
  .then(arrayCards => {
    cardList.renderItems(arrayCards);
  })
  .catch(err => {
    console.error(err);
  })
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
  popupSubmitProfile.textContent = 'Сохранить';
  setInfo();
  validFormProfile.resetValidation();
  profileSample.open();
});

  //Функция создания экземпляров Card
const createCard = (item) => {
  const card = new Card({
  data: item,
  openPopupWithDelete: (deleteImage) => {
  deleteSample.open(item._id, deleteImage);
  },
  handleCardClick: () => {
  cardImagePopup.open(item);
  },
  setLike: () => {
  api.like(item._id)
  .then((res) => {
  card.likeCountChange(res);
  })
  },
  deleteLike: () => {
  api.likeDelete(item._id)
  .then((res) => {
  card.likeCountChange(res);
  })
  },
  }, '#element');
  return card.generate();
  }; 

  //Создание карточки из коробки
  const cardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      const cardLikesCount = cardElement.querySelector('.element__like-count');
      cardLikesCount.textContent = item.likes.length;
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
    .then((res) => {
      const card = createCard(res);
      cardList.addItem(card, 'prepend');
      createSample.close();
    })
  }
});
createSample.setEventListeners();
createPopupOpenButton.addEventListener("click", function (evt) {
  popupSubmitCreate.textContent = 'Создать';
  validFormCreate.resetValidation();
  createSample.open();
});

//Экземпляр модалки аватарки 
const avatarSample = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleSubmitForm: (data) => {
    const avatar = {};
    avatar.link = data.avatarUrl;
    api.updateAvatar(avatar.link)
      .then(res => {
        profileAvatar.src = res.avatar;
        avatarSample.close();
      })
    }
});
avatarSample.setEventListeners();
avatarButton.addEventListener('click', function (evt){
  popupSubmitAvatar.textContent = 'Сохранить';
  validFormAvatar.resetValidation()
  avatarSample.open();
});

//Экземпляр модалки удаления карточки
const deleteSample = new PopupWithDelete({ 
  popupSelector: ".popup_delete",
  deleteApiRequest: (cardId, deleteImage) => {
    api.removeCard(cardId)
    .then(() => {
       deleteImage(); 
      deleteSample.close();
    })
  }
});
deleteSample.setEventListeners();

// Экземпляры класса для валидации форм
const validFormCreate = new FormValidator(validateObject, formCreate);
validFormCreate.enableValidation();
const validFormProfile = new FormValidator(validateObject, formProfile);
validFormProfile.enableValidation();
const validFormAvatar = new FormValidator(validateObject, formAvatar);
validFormAvatar.enableValidation();