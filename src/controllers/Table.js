import Product from "../models/Product";
import State from "../models/State";
import Modal from "../views/Modal";
import PopOver from "../views/PopOver";
import Confirmation from "../views/Confirmation";

export default class Table {
  constructor() {
    this.state = new State();
    this.modal = new Modal(
      document.querySelector(".modal_overlay"),
      document.querySelector("#product_name"),
      document.querySelector("#product_price"),
      document.querySelector(".cancel_btn"),
    );
    this.popOver = new PopOver();
    this.confirmation = new Confirmation(
      document.querySelector(".modal_confirm"),
    );

    this.container = document.querySelector(".container");
    this.addBtn = document.querySelector(".add_product");
    this.okBtn = document.querySelector(".ok_btn");
    this.tableBody = document.querySelector(".table_body");
  }

  init() {
    this.tableFill();
    this.container.addEventListener("click", (e) =>
      this.handleClickContainer(e),
    );
    this.modal.modal.addEventListener("click", (e) => this.handleClickModal(e));
    this.okBtn.addEventListener("click", () => {
      if (this.state.isEdit) {
        this.editProduct();
        this.tableFill();
      } else {
        this.addProduct();
      }
    });
  }

  addProduct() {
    if (this.modal.modal.style.display === "flex") {
      const nameProduct = this.modal.inputName.value;
      const priceProduct = this.modal.inputPrice.value;

      if (
        this.validateProductName(nameProduct) &&
        this.validateProductPrice(priceProduct)
      ) {
        const product = new Product(nameProduct, priceProduct);
        this.state.addState(product);
        this.state.setLocalStorage();
        this.tableFill();
        this.modal.closeModal();
      }
    }
  }

  removeProduct(e) {
    const nameNode =
      e.target.parentNode.parentNode.firstElementChild.textContent;
    e.target.parentNode.parentNode.remove();
    this.state.state = this.state
      .getLocalStorageState()
      .filter((element) => element.name !== nameNode);
    this.state.setLocalStorage();
  }

  editProduct() {
    const newState = this.state.state.map((element) => {
      if (element.name === this.state.nameNode) {
        element.name = this.modal.inputName.value;
        element.price = this.modal.inputPrice.value;
      }
      return element;
    });
    this.state.state = newState;
    this.state.setLocalStorage();
    this.modal.closeModal();
  }

  tableFill() {
    this.clearTable();
    const storage = this.state.getLocalStorageState();
    storage.forEach((element) => {
      this.createProduct(element.name, element.price);
    });
  }

  createProduct(nameProduct, priceProduct) {
    const row = document.createElement("tr");

    const colName = document.createElement("td");
    colName.textContent = nameProduct;
    row.appendChild(colName);

    const colPrice = document.createElement("td");
    colPrice.textContent = new Intl.NumberFormat("ru-RU").format(priceProduct);
    row.appendChild(colPrice);

    const controlBtn = document.createElement("td");
    const editBtn = document.createElement("img");
    editBtn.src = "./assets/images/edit.png";
    editBtn.className = "action edit_action";
    controlBtn.appendChild(editBtn);

    const deleteBtn = document.createElement("img");
    deleteBtn.src = "./assets/images/close.png";
    deleteBtn.className = "action delete_action";
    controlBtn.appendChild(deleteBtn);

    row.appendChild(controlBtn);
    this.tableBody.appendChild(row);
  }

  clearTable() {
    this.tableBody.innerHTML = "";
  }

  validateProductName(value) {
    if (value.length > 0) {
      return true;
    } else {
      this.popOver.show(this.modal.inputName, this.state.errors.name);
      return false;
    }
  }

  validateProductPrice(value) {
    const regex = /^([1-9]\d*(\.\d+)?|\d\.\d*[1-9]\d*)$/;
    if (regex.test(value)) {
      return true;
    } else {
      const error =
        this.modal.inputPrice.value === ""
          ? this.state.errors.number
          : this.state.errors.numberMin;
      this.popOver.show(this.modal.inputPrice, error);
      return false;
    }
  }

  handleClickContainer(e) {
    if (e.target === this.addBtn) {
      this.state.isEdit = false;
      this.modal.clearInput();
      this.modal.showModal();
    } else if (e.target.classList.contains("edit_action")) {
      this.state.isEdit = true;
      const nameNode =
        e.target.parentNode.parentNode.firstElementChild.textContent;
      this.state.nameNode = nameNode;
      this.modal.showModal();
      this.modal.clearInput();
      const currentProduct = this.state
        .getLocalStorageState()
        .find((element) => element.name === nameNode);
      this.modal.inputName.value = currentProduct.name;
      this.modal.inputPrice.value = currentProduct.price;
    } else if (e.target.classList.contains("delete_action")) {
      this.confirmation.showConfirmation();
      this.confirmation.setEventHandlers(
        () => this.confirmation.closeConfirmation(),
        () => {
          this.removeProduct(e);
          this.confirmation.closeConfirmation();
        },
      );
    }
  }

  handleClickModal(e) {
    if (e.target === this.modal.modal || e.target === this.modal.cancelBtn) {
      this.modal.closeModal();
    }
  }
}
