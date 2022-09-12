import App from './App.js';
import domManager from './utils/domManager.js';

// Select dom id app and insert result html
// (async () => {
//   document.getElementById('app')!.innerHTML = await App.getInstance().render();
// })();

domManager.getInstance().render(new App(), document.getElementById('app')!);
