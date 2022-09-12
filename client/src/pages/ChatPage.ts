import IComponent from '../interface/IComponent.js';
import {io} from 'socket.io-client';

const socket = io();
export default class ChatPage extends IComponent {
  constructor(params: Object) {
    super(params);
  }
  renderChat() {
    const messages = document.getElementById('messages')!;

    socket.on('chat message', msg => {
      const item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      console.log('send messages');
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
  handleSubmit() {
    const form = document.getElementById('form') as HTMLFormElement;
    const input = document.getElementById('input') as HTMLInputElement;

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });
  }
  render(): void {
    this.appendHTML(`
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
	`);
    this.appendScript(this.renderChat, this.handleSubmit);
  }
}
