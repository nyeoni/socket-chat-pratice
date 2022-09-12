import IComponent from './interface/IComponent.js';
import ChatPage from './pages/ChatPage.js';
import HomePage from './pages/HomePage.js';
import Router, {Route} from './router/Router.js';

export default class App extends IComponent {
  constructor() {
    super({});
  }
  render() {
    // default view.getHTML()
    // Router class import
    // Router.addRoute(~) ~ n
    // Router.render -> routing 해야하는 것의 view.getHTML()
    // 이 모든 것을 리턴

    // default html view
    this.appendHTML('<h1>App</h1>');
    // add routers
    const BrowserRouter = new Router();
    BrowserRouter.addRoute(new Route('/web', HomePage));
    BrowserRouter.addRoute(new Route('/chat', ChatPage));
    this.dispatch(BrowserRouter.route());
  }
}
