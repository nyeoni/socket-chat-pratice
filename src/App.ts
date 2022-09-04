export default class App {
  private static instance: App;
  private constructor() {}
  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
  async render(): Promise<string> {
    // default view.getHTML()
    // Router class import
    // Router.addRoute(~) ~ n
    // Router.render -> routing 해야하는 것의 view.getHTML()
    // 이 모든 것을 리턴
    const html = '';
    return html;
  }
}
