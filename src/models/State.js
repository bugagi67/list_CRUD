export default class State {
  constructor() {
    this.state = this.getLocalStorageState();
    this.errors = {
      name: "Введите название",
      number: "Введите сумму",
      numberMin: "Стоимость не может быть меньше 1 рубля",
    };
  }

  addState(product) {
    const currentStorage = this.getLocalStorageState();
    currentStorage.push(product);
    this.state = currentStorage;
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem("storedProduct", JSON.stringify(this.state));
  }

  getLocalStorageState() {
    if (localStorage.getItem("storedProduct")) {
      return JSON.parse(localStorage.getItem("storedProduct"));
    } else {
      return [];
    }
  }
}
