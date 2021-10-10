  export default class Card {
    constructor({data, openPopupWithDelete, handleCardClick}, selector) {
      this._text = data.name;
      this._image = data.link;
      this._cardId = data._id;
      this._userId = data.owner._id;
      this._myUserId = "fdd469b9fcfa8739145a843b";
      this._selector = selector;
      this.handleCardClick = handleCardClick;
      this._openPopupWithDelete = openPopupWithDelete;
    }
    
    _hideDeleteButton(){
      if(this._myUserId !== this._userId){
        this._deleteButton.hidden = true;
      }

    }

    _getElement() {
      const cardElement = 
      document
      .querySelector(this._selector).content
      .querySelector(".element")
      .cloneNode(true);
  
      return cardElement;
    }
  
    generate() {
      this._element = this._getElement();
      this._cardImage = this._element.querySelector(".element__image");
      this._cardTitle = this._element.querySelector(".element__title");
      this._cardLike = this._element.querySelector(".element__like");
      this._deleteButton = this._element.querySelector(".element__delete")
      this._setEventListeners();
  
      this._cardImage.src = this._image;
      this._cardImage.alt = this._text;
      this._cardTitle.textContent = this._text;
  
      return this._element;
    }
  
    _setEventListeners(){
      this._likeSetEventListeners();
      this._imageSetEventListeners();
      this._deleteSetEventListeners();
      this._hideDeleteButton();
    }

    _imageSetEventListeners() {
      this._cardImage
        .addEventListener("click", () => {
          this.handleCardClick();
        });
    }
  
    _deleteSetEventListeners() {
      this._deleteButton
        .addEventListener("click", () => {
          this._openPopupWithDelete(this.handleDeleteImage);
        });
    }
  
    handleDeleteImage = () => {
      if (this._element.closest(".element")) {
        this._element.remove();
      }
    }
  
    _likeSetEventListeners() {
      this._cardLike
        .addEventListener("click", () => {
          this._likeHandleClick();
        });
    }
  
    _likeHandleClick() {
      this._cardLike
        .classList.toggle("element__like_active");
    }
  }
  