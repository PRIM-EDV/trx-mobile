import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'trx-mobile',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
