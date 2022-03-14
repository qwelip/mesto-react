import PopupWithError from "../components/PopupWithError";

// PopupWithError
// *
const popupError = new PopupWithError('.popup_type_error');
popupError.setEventListeners();

// handleError
// *
export function handleError(error) {
  popupError.setErrorText(error);
  popupError.open();
}
