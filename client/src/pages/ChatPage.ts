import IComponent from '../interface/IComponent.js';

export default class ChatPage extends IComponent {
  constructor(params: Object) {
    super(params);
  }
  async getHTML(): Promise<string> {
    return `
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>`;
  }
}
