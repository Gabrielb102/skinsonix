import {ref, watch} from 'vue';

export function useSound() {
  const audioContext = new window.AudioContext();
  const oscillator = ref(null);
  const gainNode = ref(null);
  const volume = ref(0);
  const frequency = ref(630);
  const isOn = ref(false);

  const fadeTime = 1000; // milliseconds

  const startSound = () => {
    if (isOn.value) return;

    isOn.value = true;

    // Create audio nodes first
    oscillator.value = audioContext.createOscillator();
    gainNode.value = audioContext.createGain();

    // Set up connections
    oscillator.value.type = 'sine';
    oscillator.value.frequency.setValueAtTime(frequency.value, audioContext.currentTime);
    oscillator.value.connect(gainNode.value);
    gainNode.value.connect(audioContext.destination);

    // Start with zero volume
    gainNode.value.gain.setValueAtTime(0, audioContext.currentTime);

    // Start the oscillator
    oscillator.value.start();

    // Then fade in after a 500ms delay
    setTimeout(() => {
      const now = audioContext.currentTime;
      gainNode.value.gain.setValueAtTime(0, now);
      gainNode.value.gain.linearRampToValueAtTime(volume.value / 100, now + fadeTime/1000);
    }, 500);
  };

  const changeVolume = () => {
    if (gainNode.value && isOn.value) {
      // Don't interrupt fade operations
      const now = audioContext.currentTime;
      gainNode.value.gain.setValueAtTime(gainNode.value.gain.value, now);
      gainNode.value.gain.linearRampToValueAtTime(volume.value / 100, now + 0.05);
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
    if (!isOn.value) return;

    isOn.value = false;

    if (oscillator.value && gainNode.value) {
      // Fade out
      const now = audioContext.currentTime;
      gainNode.value.gain.setValueAtTime(gainNode.value.gain.value, now);
      gainNode.value.gain.linearRampToValueAtTime(0, now + fadeTime/1000);

      // Stop and disconnect after fade completes
      setTimeout(() => {
        if (oscillator.value) {
          oscillator.value.stop();
          oscillator.value.disconnect();
          oscillator.value = null;
        }
        if (gainNode.value) {
          gainNode.value.disconnect();
          gainNode.value = null;
        }
      }, fadeTime);
    }
  };

  const soundNotify = () => {
    stopSound();
    setTimeout(() => {
      startSound();
    }, (fadeTime * 2));
  };

  return {
    startSound,
    stopSound,
    volume,
    frequency,
    soundNotify
  };
}