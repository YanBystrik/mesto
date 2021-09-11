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

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

//Функция закрытия попапа
function closePopup(popupHide) {
  popupHide.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

//Открыть попап профиля
profileEdit.addEventListener("click", function (evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  hideInputError(formProfile, nameInput, validateObject);
  hideInputError(formProfile, jobInput, validateObject);
  toggleButtonState(inputListProfile, popupSubmitProfile, validateObject);
  openPopup(popupProfile);
});

//Сохранить изменения профиля
profileContainer.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
});

//Окно добавления фото - открыть
createPopupOpenButton.addEventListener("click", function (evt) {
  formCreate.reset()
  hideInputError(formCreate, placeInput, validateObject);
  hideInputError(formCreate, urlInput, validateObject);
  toggleButtonState(inputListCreate, popupSubmitCreate, validateObject);
  openPopup(popupCreate);
});

//Массив фотокарт
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

// //Функция добавления фото из массива
// function createCard(item) {
//   const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
//   const cardImage = elementCard.querySelector(".element__image");
//   const cardTitle = elementCard.querySelector(".element__title");

//   //Открыть картинку
//   cardImage
//     .addEventListener("click", function (evt) {
//       popupViewerImage.src = item.link;
//       popupViewerImage.alt = item.name;
//       popupViewerTitle.textContent = item.name;
//       openPopup(popupImage);
//     });

//   //Лайк
//   elementCard
//     .querySelector(".element__like")
//     .addEventListener("click", function (evt) {
//       evt.target.classList.toggle("element__like_active");
//     });

//   //Удаление
//   elementCard
//     .querySelector(".element__delete")
//     .addEventListener("click", function (evt) {
//       evt.target.closest(".element").remove();
//     });

//     cardImage.src = item.link;
//     cardImage.alt = item.name;
//     cardTitle.textContent = item.name;

//   return elementCard;
// }

// function addCard(card) {
//   const elementCard = createCard(card);
//   cardContainer.prepend(elementCard);
// }

// initialCards.forEach(addCard);

// //Добавление фото в массив
// formCreate
//   .addEventListener("submit", function (evt) {
//     evt.preventDefault();
//     const card = {};
//     card.name = popupInputTextPlace.value;
//     card.link = popupInputTextUrl.value;
//     popupInputTextPlace.value = '';
//     popupInputTextUrl.value = '';
//     addCard(card);
//     closePopup(popupCreate);
//   });

//Закрыть попап ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Закрыть попап
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);   
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    });
});


class Card {
  constructor(data, selector){
    this._text = data.name;
    this._image = data.link;
    this._selector = selector;
  }

  _getElement() {
  	const cardElement = elementTemplate.querySelector(".element").cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._likeSetEventListeners();
    this._imageSetEventListeners();
    this._deleteSetEventListeners();

    this._element.querySelector('.element__image').src = this._image;
  	this._element.querySelector('.element__title').textContent = this._text;

  	return this._element;
  }

  _imageSetEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopupImage();
      console.log('work');
    });
  }

  _handleOpenPopupImage() {
    popupViewerImage.src = this._image;
    popupViewerImage.alt = this._text;
    popupViewerTitle.textContent = this._text
    popupImage.classList.add('popup_opened');
  }

  _deleteSetEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteImage();
    });
  }

  _handleDeleteImage() {
    if (this._element.closest('.element')){
      this._element.remove();
    }
  }

  _likeSetEventListeners() {
		this._element.querySelector('.element__like').addEventListener('click', () => {
			this._likeHandleClick();
		});
	}

  _likeHandleClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _closeImageByEscape(){
    this._element.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape');
      closePopup(popup);
    });
  }

}

initialCards.forEach((item) => {
  const card = new Card(item, '.element');
  const cardItem = card.generate();

  cardContainer.prepend(cardItem);
});