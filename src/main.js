import './main.css';
import { router } from './utils/router.js';
import { App } from './App.js';

// Initialize the app
const app = document.getElementById('app');
app.innerHTML = '';

// Render the app
const root = document.createElement('div');
root.id = 'root';
app.appendChild(root);

// Initialize router and render
router.init();
App.render(root);


