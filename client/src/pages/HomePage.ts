import IComponent from '../interface/IComponent.js';

export default class HomePage extends IComponent {
  constructor(params: Object) {
    super(params);
  }
  async getHTML(): Promise<string> {
    return '<h1>HOME, Hello World</h1>';
  }
}
