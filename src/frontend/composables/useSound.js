import {ref, watch} from 'vue';

export function useSound() {
  const audioContext = new window.AudioContext();
  const oscillator = ref(null);
  const gainNode = ref(null);
  const volume = ref(0);
  const frequency = ref(620);
  const isOn = ref(false);

  const startSound = (frequency = 440) => {
    if (isOn.value) {
      return;
    } else {
      isOn.value = true;
    }
    oscillator.value = audioContext.createOscillator();
    gainNode.value = audioContext.createGain();
    gainNode.value.gain.value = volume.value / 100;

    oscillator.value.type = 'sine';
    oscillator.value.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.value.connect(gainNode.value);
    gainNode.value.connect(audioContext.destination);
    oscillator.value.start();
  };

  const changeVolume = () => {
    if (gainNode.value) {
      gainNode.value.gain.value = volume.value / 100;
    }
  };
  watch(volume, changeVolume);

  const changeFrequency = () => {
    if (oscillator.value) {
      oscillator.value.frequency.setValueAtTime(frequency.value, audioContext.currentTime);
    }
  };
  watch(frequency, changeFrequency);

  const stopSound = () => {
    if (!isOn.value) {
      return;
    } else {
      isOn.value = false;
    }
    if (oscillator.value) {
      oscillator.value.stop();
      oscillator.value.disconnect();
      gainNode.value.disconnect();
      oscillator.value = null;
      gainNode.value = null;
    }
  };

  return {
    startSound,
    stopSound,
    volume,
    frequency
  };
}