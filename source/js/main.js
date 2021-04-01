import NewsFeed from "../js/presenter/feed";
import {newsItems} from "./mocks";
import NewsModel from "./model/news";

export default class NewsWidget {
  constructor(config) {
    const {container, type, source} = config;

    this._newsBlock = document.querySelector(`#${container}`);
    this._type = type;
    this._source = source;
    this._newsModel = new NewsModel();

    this._init();
  }

  _init() {
    if (!this._newsBlock) {
      throw new Error(`Выбран несуществующий контейнер`);
    }

    switch (this._type) {
      case `server`:
        this._startFromServer();
        break;
      case `mocks`:
        this._startWithMocks();
        break;
      default:
        throw new Error(`Некорректно указан тип работы`);
    }
  }

  _startFromServer() {
    fetch(this._source)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Ошибка загрузки данных с сервера: ` +
            response.status);
        }
        response.json()
          .then((news) => {
            this._newsModel.setNews(news);
            this._renderPresenter();
          });
      })
      .catch((err) => {
        throw new Error(`Произошла неизвестная ошибка, код ошибки:` + err);
      });
  }

  _startWithMocks() {
    this._newsModel.setNews(newsItems);
    this._renderPresenter();
  }

  _renderPresenter() {
    const newsFeedPresenter = new NewsFeed(this._newsBlock, this._newsModel);
    newsFeedPresenter.init();
  }
}

window.NewsWidget = NewsWidget;
