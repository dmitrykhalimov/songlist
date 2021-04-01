import Abstract from "./abstract";

const CLOSED_CLASS = `news__feed--closed`;
const createButton = () => {
  return `<section class="news__feed">

  </section>`;
};

export default class NewsFeed extends Abstract {
  constructor() {
    super();
    this._createTemplate = createButton();
  }

  // если пользователь скрывает/раскрывает виджет
  toggleNewsFeed() {
    if (this.getElement().classList.contains(CLOSED_CLASS)) {
      this.getElement().classList.remove(CLOSED_CLASS);
    } else {
      this.getElement().classList.add(CLOSED_CLASS);
    }
  }
}
