import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useDiagramStore = defineStore("diagram", () => {
        const forehead = ref("default")
        const chin = ref("default")
        const nose = ref("default")
        const upperLip = ref("default")
        const cheekTempleLeft = ref("default")
        const cheekTempleRight = ref("default")
        const jowlLeft = ref("default")
        const jowlRight = ref("default")
        const neckLeft = ref("default")
        const neckRight = ref("default")

        // The store is a reactive object already, so these are all just properties already.
        return {
            forehead,
            chin,
            nose,
            upperLip,
            cheekTempleLeft,
            cheekTempleRight,
            jowlLeft,
            jowlRight,
            neckLeft,
            neckRight
        }
    }
)