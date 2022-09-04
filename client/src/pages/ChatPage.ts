import IComponent from '../interface/IComponent.js';

export default class ChatPage extends IComponent {
  constructor(params: Object) {
    super(params);
  }
  async getHTML(): Promise<string> {
    return '<h1>ChatPage</h1>';
  }
}
