export default class NewsData {
  constructor() {
    this._news = [];
  }

  setNews(news) {
    this._news = news;
  }

  getNews() {
    return this._news;
  }
}
