import { createApp } from 'vue';
import '@/frontend/index.css';
import App from '@components/App.vue';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

import {Panel, Button} from "primevue";

app.component('PPanel', Panel);
app.component('PButton', Button);

app.mount('#app');
