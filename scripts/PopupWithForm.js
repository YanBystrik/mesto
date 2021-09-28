import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, form, inputList, handleSubmitForm }){
        super(popupSelector);
        this.handleSubmitForm = handleSubmitForm;
        this._form = form;
        this._inputList = inputList;
    }

    _getInputValues(){
        this.inputValues = {};
        this._inputList.forEach(input => {
            this.inputValues[input.name] = input.value; 
        });
        return this.inputValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleSubmitForm(this._getInputValues);
        });
    }

    close(){
        super.close();
        this._form.reset();
    }
}