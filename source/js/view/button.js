import Abstract from "./abstract";

const OPENED_CLASS = `news__button--opened`;
const createTemplate = (allQuantity, notReadQuantity) => {
  return `<button class="news__button">
  <span>Новости</span>
  <span>${allQuantity} / ${notReadQuantity} непрочитано</span>
  <span></span>
</button>`;
};

export default class Button extends Abstract {
  constructor(allQuantity, notReadQuantity) {
    super();

    this._element = null;

    this._allQuantity = allQuantity;

    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);

    this._createTemplate = createTemplate(allQuantity, notReadQuantity);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  changeReaded(notReadQuantity) {
    this._qunatity = this.getElement().querySelector(`span:not(:first-child)`);
    this._qunatity.textContent = `${this._allQuantity} / ${notReadQuantity} непрочитано`;
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();

    if (!this.getElement().classList.contains(OPENED_CLASS)) {
      this.getElement().classList.add(OPENED_CLASS);
    } else {
      this.getElement().classList.remove(OPENED_CLASS);
    }
  }
}
