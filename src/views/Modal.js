export default class Modal {
  constructor(modalElement, inputName, inputPrice, cancelBtn) {
    this.modal = modalElement;
    this.inputName = inputName;
    this.inputPrice = inputPrice;
    this.cancelBtn = cancelBtn;
  }

  showModal() {
    this.modal.style.display = "flex";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  clearInput() {
    this.inputName.value = "";
    this.inputPrice.value = "";
  }
}
