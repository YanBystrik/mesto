const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationClasses
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationClasses.inputErrorClass);
  errorElement.innerText = errorMessage;
  errorElement.classList.add(validationClasses.errorClass);
};

const hideInputError = (formElement, inputElement, validationClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationClasses.inputErrorClass);
  errorElement.classList.remove(validationClasses.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationClasses
    );
  } else {
    hideInputError(formElement, inputElement, validationClasses);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, validationClasses) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationClasses.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(validationClasses.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", false);
  }
};

const setEventListeners = (formElement, validationClasses) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationClasses.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationClasses.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationClasses);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationClasses);
      toggleButtonState(inputList, buttonElement, validationClasses);
    });
  });
};

const enableValidation = (validationClasses) => {
  const formList = Array.from(
    document.querySelectorAll(validationClasses.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationClasses);
  });
};

const validateObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_invalid",
  errorClass: "error_active",
};

enableValidation(validateObject);
