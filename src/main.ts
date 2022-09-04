import App from './App.js';

// Select dom id app and insert result html
document.getElementById('app')!.innerHTML = await App.getInstance().render();
