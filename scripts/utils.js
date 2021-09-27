  // Экспорт в модули index и Card
  export {
    elementTemplate, 
    popupViewerImage, 
    popupViewerTitle,
  };

const elementTemplate = document.querySelector("#element").content;
const popupViewerImage = document.querySelector(".popup__viewer_image");
const popupViewerTitle =  document.querySelector(".popup__viewer_title");


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
  

  // Закрыть попап ESC
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }