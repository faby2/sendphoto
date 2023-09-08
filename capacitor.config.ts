import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sendphoto',
  webDir: 'www',
  // server: {
  //   androidScheme: 'https'
  // }
  server: {
    androidScheme: "https",
    cleartext: true,
    allowNavigation: [
      // "http://test.test.id/api/*"
      "https://www.monade-alimentaire.fr/api/"
    ]
  }
};

export default config;
