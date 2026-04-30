import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.MatchUp.app',
  appName: 'MatchUp',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Muncul selama 3 detik
      launchAutoHide: true,
      backgroundColor: "#ffffffff", // Warna background jika gambar tidak penuh
      androidScaleType: "CENTER_CROP"
    },
  },
};

export default config;