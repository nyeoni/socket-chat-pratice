import ChatPage from './pages/ChatPage.js';
import HomePage from './pages/HomePage.js';
import Router, {Route} from './router/Router.js';

export default class App {
  private html;
  private static instance: App;
  private constructor() {
    this.html = '';
  }
  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
  async render() {
    // default view.getHTML()
    // Router class import
    // Router.addRoute(~) ~ n
    // Router.render -> routing 해야하는 것의 view.getHTML()
    // 이 모든 것을 리턴
    this.html += '<h1>App</h1>';

    const BrowserRouter = new Router();
    BrowserRouter.addRoute(new Route('/', HomePage));
    BrowserRouter.addRoute(new Route('/chat', ChatPage));
    this.html += await BrowserRouter.render();

    return this.html;
  }
}
