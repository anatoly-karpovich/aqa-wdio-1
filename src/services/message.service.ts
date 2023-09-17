let clientOn = false;
let marsOn = false;
let earthOn = false;
let satelliteOn = false;

const marsToken = "M" + Math.random().toString(36).substr(2, 4).toUpperCase();
const earthToken = "E" + Math.random().toString(36).substr(2, 4).toUpperCase();

export default {
  startClientPC: () => {
    clientOn = true;
  },
  startMarsServer: () => {
    marsOn = true;
    return marsToken;
  },
  startEarthServer: () => {
    earthOn = true;
    return earthToken;
  },
  startSatelite: () => {
    satelliteOn = true;
  },
  stopClientPC: () => {
    clientOn = false;
  },
  stopMarsServer: () => {
    marsOn = false;
  },
  stopEarthServer: () => {
    earthOn = false;
  },
  stopSatelite: () => {
    satelliteOn = false;
  },

  sendMessage(msg: string, to: string, token: string) {
    if (!msg || !to || !token) {
      throw new Error("Broken: Wrong parameters");
    }

    if (to === "Mars") {
      if (!clientOn) {
        throw new Error("Broken: Client is offline!");
      }
      if (!marsOn) {
        throw new Error("Broken: Mars Server is offline!");
      }
      if (!satelliteOn) {
        return "Service is unavailable";
      }
      if (token !== marsToken) {
        return "Security Error";
      }
      return "Success";
    }

    if (to === "Earth") {
      if (!clientOn) {
        throw new Error("Broken: Client is offline!");
      }
      if (!earthOn) {
        throw new Error("Broken: Earth Server is offline!");
      }
      if (!satelliteOn) {
        return "Service is unavailable";
      }
      if (token !== earthToken) {
        return "Security Error";
      }
      return "Success";
    }

    throw new Error("Broken: Something is wrong");
  },

  assertResponse: (actual: string, expected: string) => {
    if (actual !== expected) {
      throw new Error(`Failed: wrong message\n expected: '${expected}'\n actual:   '${actual}'`);
    }
  },
};
