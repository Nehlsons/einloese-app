
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1e996a40056d4be2a773f5b5bbdb6898',
  appName: 'appsynergy-flutter',
  webDir: 'dist',
  server: {
    url: 'https://1e996a40-056d-4be2-a773-f5b5bbdb6898.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff"
    }
  }
};

export default config;
