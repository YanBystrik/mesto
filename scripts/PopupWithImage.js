import {
    popupViewerTitle,
    popupViewerImage,
  } from "./utils.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector){
        super(popupSelector);
        this._text = data.name;
        this._image = data.link;
        

    }

    open(){
        popupViewerImage.src = this._image;
        popupViewerImage.alt = this._text;
        popupViewerTitle.textContent = this._text;
        super.open();
    }
}