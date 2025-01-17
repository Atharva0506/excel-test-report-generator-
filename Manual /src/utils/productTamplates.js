const productTemplates = {
    "LED LIGHT : 1W, 12V": {
      header: ["SR. NO", "UNIT NO", "CURRENT CONSUMPTION FOR 12V (0.06 - 0.08) (AMP)", "OVP DISCONNECT (15V +/- 0.5V) (VOLTS)", "OVP RECONNECT (14.5V +/- 0.5V) (VOLTS)", "OVP SUSTAINING (@30V) (VOLTS)"],
      AMP: ["0.06", "0.07", "0.08"],
      data: [],
    },
    "LED LIGHT : 1W, 24V": {
      header: ["SR. NO", "UNIT NO", "CURRENT CONSUMPTION FOR 24V (0.03) to 0.05 (AMP)", "OVP DISCONNECT (29V +/- 1.0V) (VOLTS)", "OVP RECONNECT(28V +/- 0.8V) (VOLTS)", "OVP SUSTAINING (@ 30V) (VOLTS)"],
      AMP: ["0.03", "0.04", "0.05"],
      data: [],
    },
    "LED TUBE : 2W, 12V": {
      header: ["SR. NO", "UNIT NO", "CURRENT CONSUMPTION FOR 12V (0.12 to 0.15) (AMP)", "OVP DISCONNECT (15V +/- 0.5V)", "OVP RECONNECT(14.5V +/- 0.5V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
      AMP: ["0.12", "0.13", "0.14", "0.15"],
      data: [],
    },
    "LED TUBE : 2W, 12V (16V DISCONECT) (006037271H91)": {
      header: ["SR. NO", "UNIT NO", "@12V (0.12 to 0.14) (AMP)", "@10V (LED GLOW)", "@ OVP DISCONNECT (16V +0.7 , -0V)", "OVP RECONNECT(above 15.40V)", "OVP SUSTAINING (30V)", "ON/OFF Operation 5 times "],
      AMP: ["0.12", "0.13", "0.14"],
      data: [],
    },
    "LED TUBE : 2W, 24V": {
      header: ["SR. NO", "UNIT NO", "CURRENT CONSUMPTION FOR 24V (0.06 to 0.08) (AMP)", "OVP DISCONNECT (29V +/- 1.0V)", "OVP RECONNECT(28V +/- 0.75V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
      AMP: ["0.06", "0.07", "0.08"],
      data: [],
    },
    "LED TUBE : 2W, 12V KOEL(K1B) (D8.079.48.0.PR)": {
      header: ["SR. NO", "UNIT NO", "FOR 12V (0.12 - 0.15) (AMP)", "OVP DISCONNECT (16.4V +/- 0.4V)", "OVP RECONNECT(15V +/- 0.5V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
      AMP: ["0.12", "0.13", "0.14", "0.15"],
      data: [],
    },
    "LED TUBE : 2W, 24V KOEL(K2B) (D8.079.49.0.PR)": {
      header: ["SR. NO", "UNIT NO", "FOR 24V (0.06 - 0.08) (AMP)", "OVP DISCONNECT (29V +/- 0.5V)", "OVP RECONNECT(28.25V +/- 0.75V)", "OVP SUSTAINING (@ 30V)", "ON/OFF Operation 5 times "],
      AMP: ["0.06", "0.07", "0.08"],
      data: [],
    },
  };
  
  export default productTemplates;
  