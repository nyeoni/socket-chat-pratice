import IComponent from '../interface/IComponent';

export default class domManager {
  private static instance: domManager;
  private constructor() {}
  public static getInstance(): domManager {
    if (!domManager.instance) {
      domManager.instance = new domManager();
    }
    return domManager.instance;
  }
  async render(element: IComponent, root: HTMLElement) {
    await element.render();
    // parse default page html
    // async 처리되는지 확인
    await (async () => {
      root!.innerHTML = await element.getHTML();
    })();
    element.runScripts();
  }
}
