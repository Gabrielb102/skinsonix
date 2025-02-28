import {Panel, Button, Slider} from "primevue";

export default function registerComponents(app) {
    app.component('PrimePanel', Panel);
    app.component('PrimeButton', Button);
    app.component('PrimeSlider', Slider);
}
