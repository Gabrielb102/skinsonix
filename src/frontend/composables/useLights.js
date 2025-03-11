import {ref, watch} from 'vue';

const openWandPort = () => {
  const isPluggedIn = ref(false);

  const openPort = () => {
    window.wand.openPort().then((port) => {
      console.log("Successfully opened port: ", port);
      isPluggedIn.value = true;
    }).catch((err) => {
      console.error(err);
    });
    if (!isPluggedIn.value) {
      console.log("Wand not plugged in");
      setTimeout(openPort, 5000);
    }
  }

  openPort();

  return isPluggedIn;
}

export function useLights() {

  const isPluggedIn = openWandPort();
  const isOn = ref(false);

  const redValue = ref(127);
  const blueValue = ref(127);

  // function to write new values to wand
  const writeWandLight = (redValue, blueValue) => {

    if (!isOn.value) {
      return;
    }

    const message = new Uint8Array([
      0xFF,                   // Start byte
      0x00,                   // Command or parameter byte
      blueValue,        // Blue LED intensity (0-255)
      redValue,         // Red LED intensity (0-255)
    ]);

    // Write the message to the serial port
    window.wand.write(message, err => {
      if (err) {
        console.error('Error writing to port:', err.message);
      }
    });
  };

  watch([redValue, blueValue], () => writeWandLight(redValue.value, blueValue.value));

  const turnLightsOn = () => {
    isOn.value = true;
    writeWandLight(redValue.value,blueValue.value);
  }

  const turnLightsOff = () => {
    writeWandLight(0,0);
    isOn.value = false;

  }

  return {
    redValue, blueValue, isPluggedIn, turnLightsOn, turnLightsOff
  };

}
