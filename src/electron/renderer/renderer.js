import {createApp} from 'vue';
import {createPinia} from 'pinia';
import router from '@frontend/routing/router';
import '@frontend/index.css';
import 'primeicons/primeicons.css';
import App from '@components/App.vue';
import PrimeVue from 'primevue/config';
import SkinSonixTheme from "@frontend/config/theme.js";
import registerComponents from "@frontend/config/components.js";


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(PrimeVue, {
    theme: {
        preset: SkinSonixTheme,
        options: {
            darkModeSelector: false,
        }
    }
});

registerComponents(app);

app.mount('#app');
