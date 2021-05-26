class MQTTFirmware {
  get TASMOTA() {
    return {
      power1: {
        topic: 'POWER1',
        on: 'on',
        off: 'off',
      },
      power2: {
        topic: 'POWER2',
        on: 'on',
        off: 'off',
      },
      dimmabel: '',
      color: '',
    };
  }

  get SHELLY() {
    return {
      power: 'POWER',
    };
  }
}
