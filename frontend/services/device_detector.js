import { deviceTypes } from 'src/constants/device_types';

const deviceDetector = {
  getDeviceType: function() {
    const standalone = window.navigator.standalone;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const safari = /safari/.test(userAgent);
    const ios = /iphone|ipod|ipad/.test(userAgent);

    if (ios) {
      if (!standalone && safari) {
        return deviceTypes.iosBrowser;
      } else if (standalone && !safari) {
        return "poo";
      } else if (!standalone && !safari) {
        return deviceTypes.iosWebview;
      };
    } else {
      //not iOS
    };
  }
}

export default deviceDetector;
