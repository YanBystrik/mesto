import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector){
        super(popupSelector);
        this._text = data.name;
        this._image = data.link;
        this._popupImage = document.querySelector('.popup__viewer_image');
        this._popupText = document.querySelector('.popup__viewer_title');
    }

    open(){
        this._popupImage.src = this._image;
        this._popupImage.alt = this._text;
        this._popupText.textContent = this._text;
        super.open();
        super.setEventListeners();
    }
}