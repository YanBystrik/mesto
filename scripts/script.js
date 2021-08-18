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

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Функция закрытия попапа
function closePopup(popupHide) {
  popupHide.classList.remove("popup_opened");
}

// Открыть попап профиля
profileEdit.addEventListener("click", function (evt) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  hideInputError(formProfile, nameInput, validateObject);
  hideInputError(formProfile, jobInput, validateObject);
  toggleButtonState(inputListProfile, popupSubmitProfile, validateObject);
  openPopup(popupProfile);
});

//Закрыть попап профиля
profilePopupCloseButton.addEventListener("click", function (evt) {
  closePopup(popupProfile);
});

// Сохранить изменения профиля
profileContainer.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
});

//Окно добавления фото - открыть
createPopupOpenButton.addEventListener("click", function (evt) {
  hideInputError(formCreate, placeInput, validateObject);
  hideInputError(formCreate, urlInput, validateObject);
  toggleButtonState(inputListCreate, popupSubmitCreate, validateObject);
  openPopup(popupCreate);
});

//Окно добавления фото - закрыть
closeAddButton.addEventListener("click", function (evt) {
  closePopup(popupCreate);
  formCreate.reset();
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

// Функция добавления фото из массива
function createCard(item) {
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);

  //Открыть картинку
  elementCard
    .querySelector(".element__image")
    .addEventListener("click", function (evt) {
      document.querySelector(".popup__viewer_image").src = item.link;
      document.querySelector(".popup__viewer_image").alt = item.name;
      document.querySelector(".popup__viewer_title").textContent = item.name;
      openPopup(popupImage);
    });

  // Лайк
  elementCard
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });

  //Удаление
  elementCard
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });

  elementCard.querySelector(".element__image").src = item.link;
  elementCard.querySelector(".element__image").alt = item.name;
  elementCard.querySelector(".element__title").textContent = item.name;

  return elementCard;
}

function addCard(card) {
  const elementCard = createCard(card);
  cardContainer.prepend(elementCard);
}

initialCards.forEach(function (item) {
  addCard(item);
});

//Закрыть картинку
document
.querySelector(".popup__close_image")
.addEventListener("click", function (evt) {
  closePopup(popupImage);
});

// Добавление фото в массив
popupSubmitCreate
  .addEventListener("click", function (evt) {
    evt.preventDefault();
    let card = new Object();
    card.name = document.querySelector(".popup__input_text_place").value;
    card.link = document.querySelector(".popup__input_text_url").value;
    document.querySelector(".popup__input_text_place").value = '';
    document.querySelector(".popup__input_text_url").value = '';
    addCard(card);
    closePopup(popupCreate);
  });

  //Закрыть попап кликом на оверлей
document.addEventListener("mousedown", function (evt){
  if (evt.target.classList.contains('popup')){
    closePopup(popupProfile);

    closePopup(popupCreate);
    formCreate.reset();

    closePopup(popupImage);
  }
});

//Закрыть попап ESC
document.addEventListener("keydown", function(evt){
  if (evt.key === "Escape"){
    closePopup(popupProfile);

    closePopup(popupCreate);
    formCreate.reset();

    closePopup(popupImage);
  }
});