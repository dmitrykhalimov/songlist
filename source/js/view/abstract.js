import {createElement} from "../utils/render";

export default class Abstract {
  constructor() {
    this._element = null;
    this._createTemplate = null;
    this._callback = null;
  }

  getTemplate() {
    return this._createTemplate;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
