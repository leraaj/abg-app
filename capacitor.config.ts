import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "ABG",
  webDir: "dist",
  plugins: {
    StatusBar: {
      overlaysWebView: false, // Prevents content from going under the status bar
    },
  },
};

export default config;
