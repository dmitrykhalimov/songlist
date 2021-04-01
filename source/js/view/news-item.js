import Abstract from "./abstract";
import {translateDateFromServer} from "../utils/utils.js";

const CLOSED_CLASS = `news__text--closed`;
const createDescription = (text) => {
  return text.reduce((acc, textItem) => {
    acc += `<p>${textItem}</p>`;
    return acc;
  }, ``);
};

const createTemplate = (heading, name, time, text, isRead) => {
  return `<article class="news__item">
      <h3>${heading}</h3>
      <div class="news__details">
        <b>${name}</b>
        <time datetime="2001-05-15 19:00">${translateDateFromServer(time)}</time>
        <span>${!isRead ? `Не прочитано` : `Прочитано`}</span>
        <button>Читать далее</button>
        <div class="news__text news__text--closed">
          ${createDescription(text)}
        </div>
      </div>
    </article>`;
};

export default class NewsItem extends Abstract {
  constructor(newsItem) {
    super();

    this._heading = newsItem.heading;
    this._name = newsItem.name;
    this._time = newsItem.date;
    this._isRead = newsItem.isRead;
    this._text = newsItem.text;
    this._callback = {};

    this._newsTextContainer = this.getElement().querySelector(`.news__text`);
    this._buttonExpand = this.getElement().querySelector(`button`);
    this._readStatus = this.getElement().querySelector(`span`);

    this._buttonClickHandler = this._buttonClickHandler.bind(this);
  }

  getTemplate() {
    return createTemplate(
        this._heading,
        this._name,
        this._time,
        this._text,
        this._isRead);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this._buttonExpand.addEventListener(`click`, this._buttonClickHandler);
  }

  _buttonClickHandler() {
    if (this._newsTextContainer.classList.contains(CLOSED_CLASS)) {
      this._newsTextContainer.classList.remove(CLOSED_CLASS);
      this._buttonExpand.textContent = `Свернуть`;

      if (!this._isRead) {
        // это эмуляция смены статуса, т.к. в задании указано не хранить статус. В боевом проекте нужно было бы обновлять модель и перерисовывать компонент.
        this._isRead = true;
        this._readStatus.textContent = `Прочитано`;
        this._callback.click();
      }

    } else {
      this._newsTextContainer.classList.add(CLOSED_CLASS);
      this._buttonExpand.textContent = `Читать далее`;
    }
  }
}
