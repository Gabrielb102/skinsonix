import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const SkinSonixTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: "#FAF5FF",
            100: "#F8F0FF",
            200: "#EEDBFF",
            300: "#E7CCFF",
            400: "#E0BDFF",
            500: "#D8ACFF",
            600: "#B057FF",
            700: "#8800FF",
            800: "#5A00A8",
            900: "#2E0057",
            950: "#160029"
        }
    }
});

export default SkinSonixTheme;