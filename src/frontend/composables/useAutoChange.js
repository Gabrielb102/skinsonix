import {computed, watch} from "vue";
import {usePhaseStore} from "@frontend/stores/usePhaseStore";

export function useAutoChange() {
    const phaseStore = usePhaseStore();

    const changeOverPhase = (controlRef, startPropertyName, endPropertyName, multiplier = 1) => {
        const phase = computed(() => phaseStore.current);
        const completion = computed(() => phaseStore.completion);
        watch(phase, () => {
            const startValue = computed(() => phase.value?[startPropertyName] : 0);
            const endValue = computed(() => phase.value?[endPropertyName] : 0);
            const totalChange = computed(() => endValue.value - startValue.value);
            const currentProgress = computed(() => totalChange.value * completion.value);
            const supposedValue = computed(() => Math.round((phase.value[startPropertyName] + currentProgress.value) * multiplier));

            const difference = computed(() => Math.abs(supposedValue.value - controlRef.value));
            const threshold = computed(() => controlRef.value * 0.1);
            // If the actual value is within 10% of the supposed value, we consider it "close enough" to change.
            // If it is further, then it must have been manually changed by the user, so we don't change it.
            // If the user wants to set it back, they only have to be within the threshold to resume.

            watch(supposedValue, () => {
                if (difference <= threshold) {
                    controlRef.value = supposedValue.value;
                }
            }, {immediate: true});
        }, {once: true});
    }

    return {changeOverPhase}
}