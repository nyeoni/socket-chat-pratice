import IComponent from '../interface/IComponent.js';

export default class HomePage extends IComponent {
  constructor(params: Object) {
    super(params);
  }
  render(): void {
    this.appendHTML('<h1>HOME, Hello World</h1>');
  }
}
