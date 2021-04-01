import Abstract from "./abstract";

const createTemplate = () => {
  return `<section class="news__container"></section>`;
};

export default class NewsContainer extends Abstract {
  constructor() {
    super();
    this._element = null;
    this._createTemplate = createTemplate();
  }
}
