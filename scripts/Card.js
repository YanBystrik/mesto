import {
    elementTemplate,
    popupViewerTitle,
    popupViewerImage,
    closeByEscape,
    popupImage,
  } from "./script.js";
  
  export default class Card {
    constructor(data, selector) {
      this._text = data.name;
      this._image = data.link;
      this._selector = selector;
    }
  
    _getElement() {
      const cardElement = elementTemplate
        .querySelector(".element")
        .cloneNode(true);
  
      return cardElement;
    }
  
    generate() {
      this._element = this._getElement();
      this._likeSetEventListeners();
      this._imageSetEventListeners();
      this._deleteSetEventListeners();
  
      this._element.querySelector(".element__image").src = this._image;
      this._element.querySelector(".element__title").textContent = this._text;
  
      return this._element;
    }
  
    _imageSetEventListeners() {
      this._element
        .querySelector(".element__image")
        .addEventListener("click", () => {
          this._handleOpenPopupImage();
        });
    }
  
    _handleOpenPopupImage() {
      popupViewerImage.src = this._image;
      popupViewerImage.alt = this._text;
      popupViewerTitle.textContent = this._text;
      document.addEventListener("keydown", closeByEscape);
      popupImage.classList.add("popup_opened");
    }
  
    _deleteSetEventListeners() {
      this._element
        .querySelector(".element__delete")
        .addEventListener("click", () => {
          this._handleDeleteImage();
        });
    }
  
    _handleDeleteImage() {
      if (this._element.closest(".element")) {
        this._element.remove();
      }
    }
  
    _likeSetEventListeners() {
      this._element
        .querySelector(".element__like")
        .addEventListener("click", () => {
          this._likeHandleClick();
        });
    }
  
    _likeHandleClick() {
      this._element
        .querySelector(".element__like")
        .classList.toggle("element__like_active");
    }
  }
  