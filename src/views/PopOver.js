export default class PopOver {
  show(inputElement, errorMessage) {
    let popOver = document.createElement("div");
    popOver.className = "popover";
    popOver.textContent = errorMessage;

    const inputRect = inputElement.getBoundingClientRect();
    popOver.style.top = `${inputRect.bottom + window.scrollY}px`;
    popOver.style.left = `${inputRect.left + window.scrollX}px`;

    inputElement.parentNode.appendChild(popOver);

    setTimeout(() => {
      popOver.remove();
    }, 3000);
  }
}
