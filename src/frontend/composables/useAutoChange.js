import {computed, watch} from "vue";
import {usePhaseStore} from "@frontend/stores/usePhaseStore";

export function useAutoChange() {
  const phaseStore = usePhaseStore();

  function getLastPart(str) {
    const parts = str.split('_');
    return parts[0];
  }

  const changeOverPhase = (controlRef, startPropertyName, endPropertyName, multiplier = 1, log = false) => {
    const phase = computed(() => phaseStore.current);
    const completion = computed(() => phaseStore.completion);
    watch(phase, () => {
      const startValue = computed(() => phase.value[startPropertyName]);
      const endValue = computed(() => phase.value[endPropertyName]);
      const range = computed(() => endValue.value - startValue.value);
      const currentProgress = computed(() => range.value * completion.value);
      const supposedValue = computed(() => (startValue.value + currentProgress.value) * multiplier);

      const difference = computed(() => Math.abs(supposedValue.value - controlRef.value));
      const threshold = computed(() => controlRef.value * 0.1);
      // If the actual value is within 10% of the supposed value, we consider it "close enough" to change.
      // If it is further, then it must have been manually changed by the user, so we don't change it.
      // If the user wants to set it back, they only have to be within the threshold to resume.

      watch(range, () => {
        phaseStore.$patch({completion: 0});
      });

      watch(supposedValue, () => {
        if (log) {
          console.log("Block");
          console.log(`Supposed value for ${getLastPart(endPropertyName)} : ${supposedValue.value}`);
          console.log("Range: ", range.value);
          console.log("Completion: ", completion.value);
          console.log("Current Progress: ", currentProgress.value);
        }
        if (difference <= threshold) {
          controlRef.value = supposedValue.value;
        }
      }, {immediate: true});
    }, {once: true});
  }

  return {changeOverPhase}
}