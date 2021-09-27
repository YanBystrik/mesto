import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm, form, inputList){
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = form;
        this._inputList = inputList;
    }

    _getInputValues(){
        this.inputValues = {};
        this._inputList.forEach(input => {
            this.inputValues = {name: input.value}; 
        });
        return this.inputValues;
    }

    setEventListeners(){
        super._setEventListeners();
        this._form.addEventListener('submit',  (evt) => {
            evt.preventDefault();
            super._popupSelector.close();
            this._handleSubmitForm();
        });
    }

    close(){
        super.close();
        this._form.reset();
    }
}