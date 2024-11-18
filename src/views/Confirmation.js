export default class Confirmation {
  constructor(confirmationElement) {
    this.confirmationElement = confirmationElement;
  }

  showConfirmation() {
    this.confirmationElement.style.display = "flex";
  }

  closeConfirmation() {
    this.confirmationElement.style.display = "none";
  }

  setEventHandlers(cancelCallback, confirmCallback) {
    document
      .querySelector(".cancel_btn_confirm")
      .addEventListener("click", cancelCallback);
    document
      .querySelector(".ok_btn_confirm")
      .addEventListener("click", confirmCallback);
  }
}
