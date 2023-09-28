import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sendphoto',
  webDir: 'www',
  // server: {
  //   androidScheme: 'https'
  // }
  server: {
    allowNavigation: []
  },
  android: {
    allowMixedContent: true
  },
  // server: {
  //   androidScheme: "https",
  //   cleartext: true,
  //   allowNavigation: [
  //     // "http://test.test.id/api/*"
  //     "https://www.monade-alimentaire.fr/api/"
  //   ]
  // },
  plugins: {
    plugins: {
      CapacitorCookies: {
        enabled: true
      },
      CapacitorHttp: {
        enabled: true
      }
    }
  }
};

export default config;
