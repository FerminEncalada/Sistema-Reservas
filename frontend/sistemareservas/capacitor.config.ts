import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
 "appId": "com.reservacancha.app",
  "appName": "ReservaCancha",
  "webDir": "build",
  "server": {
    "androidScheme": "http",
    "cleartext": true,
    "allowNavigation": [
      "localhost",
      "192.168.1.100",
      "*.local"
    ]
  },
  "android": {
    "buildOptions": {
      "keystorePath": "",
      "keystoreAlias": ""
    }
  }
};

export default config;
