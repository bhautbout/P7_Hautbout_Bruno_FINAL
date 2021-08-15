//Fichier qui fait le lien entre les différentes parties de Vue//

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'axios';

createApp(App)
	.use(router)
	.mount('#app');
