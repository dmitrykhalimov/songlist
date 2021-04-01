import {render, RenderPosition} from "../utils/render";
import MainButton from "../view/button";
import NewsContainer from "../view/news-container";
import NewsFeed from "../view/news-feed";
import NewsItem from "../view/news-item";
import {howManyReaded} from "../utils/utils.js";

export default class Feed {
  constructor(newsBlock, newsModel) {
    this._newsItems = newsModel.getNews();
    this._isRendered = false;
    this._allQuantity = newsModel.getNews().length;
    this._notReadQuantity = howManyReaded(newsModel.getNews());

    this._newsBlock = newsBlock; // блок куда рендерится виджет
    this._newsContainerComponent = new NewsContainer(); // основной контейнер
    this._buttonComponent = new MainButton(newsModel.getNews().length, howManyReaded(newsModel.getNews()));
    this._newsFeedComponent = new NewsFeed();

    this._handleNewsButtonClick = this._handleNewsButtonClick.bind(this);
    this._handleReadNewsClick = this._handleReadNewsClick.bind(this);
  }

  init() {
    this._renderContainer();
    this._renderButton();
  }

  _renderContainer() {
    render(this._newsBlock, this._newsContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderButton() {
    render(this._newsContainerComponent.getElement(), this._buttonComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._buttonComponent.setClickHandler(this._handleNewsButtonClick);
  }

  _renderNews() {
    this._newsItems.forEach((newsItemData) => {
      const newsItem = new NewsItem(newsItemData);
      newsItem.setClickHandler(this._handleReadNewsClick);
      render(this._newsFeedComponent.getElement(), newsItem.getElement(), RenderPosition.BEFOREEND);
    });


    render(this._newsContainerComponent.getElement(), this._newsFeedComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _handleNewsButtonClick() {
    if (!this._isRendered) {
      this._renderNews();
      this._isRendered = true;
    } else {
      this._newsFeedComponent.toggleNewsFeed();
    }
  }

  _handleReadNewsClick() {
    // также заглушка, в "боевом" режиме использовалась бы перерисовка кнопки, после изменения модели
    this._notReadQuantity--;
    this._buttonComponent.changeReaded(this._notReadQuantity);
  }
}
