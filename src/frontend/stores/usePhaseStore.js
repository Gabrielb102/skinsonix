import {defineStore} from 'pinia';
import {ref} from 'vue';

export const usePhaseStore = defineStore("phase", () => {
    const current = ref(null);
    const completion = ref(0);

    return {current, completion}
})