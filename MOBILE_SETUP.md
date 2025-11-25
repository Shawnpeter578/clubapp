# Mobile App Setup Guide

This guide will help you build and run the Club App on Android and iOS devices.

## Prerequisites

### Required for All Platforms
- **Node.js** (v16 or higher) - Already installed ✓
- **npm** - Already installed ✓

### For Android Development
- **Android Studio** - [Download here](https://developer.android.com/studio)
  - During installation, make sure to install:
    - Android SDK
    - Android SDK Platform
    - Android Virtual Device (for emulator)

### For iOS Development (macOS only)
- **macOS** with Xcode installed
- **Xcode** - [Download from Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **CocoaPods** - Install with: `sudo gem install cocoapods`

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Web App
```bash
npm run build
```

### 3. Sync Web Assets to Native Projects
```bash
npm run cap:sync
```

## Running on Android

### Option A: Using Android Emulator

1. **Open Android Studio**
   ```bash
   npm run cap:open:android
   ```

2. **Wait for Gradle sync to complete** (first time may take several minutes)

3. **Create an emulator** (if you don't have one):
   - Click "Device Manager" in Android Studio
   - Click "Create Device"
   - Select a device (e.g., Pixel 5)
   - Select a system image (e.g., Android 13)
   - Click "Finish"

4. **Run the app**:
   - Select your emulator from the device dropdown
   - Click the green "Run" button (or press Shift+F10)

### Option B: Using Physical Android Device

1. **Enable Developer Mode** on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect your device** via USB

3. **Open Android Studio**
   ```bash
   npm run cap:open:android
   ```

4. **Run the app**:
   - Your device should appear in the device dropdown
   - Click the green "Run" button

## Running on iOS (macOS only)

### Option A: Using iOS Simulator

1. **Open Xcode**
   ```bash
   npm run cap:open:ios
   ```

2. **Select a simulator**:
   - Click the device dropdown near the top
   - Choose an iPhone simulator (e.g., iPhone 15 Pro)

3. **Run the app**:
   - Click the "Play" button (or press Cmd+R)

### Option B: Using Physical iOS Device

1. **Connect your iPhone/iPad** via USB

2. **Open Xcode**
   ```bash
   npm run cap:open:ios
   ```

3. **Configure signing**:
   - Select the project in the navigator
   - Go to "Signing & Capabilities"
   - Select your development team

4. **Trust the developer** on your device:
   - Settings → General → VPN & Device Management
   - Trust your developer certificate

5. **Run the app**:
   - Select your device from the dropdown
   - Click the "Play" button

## Development Workflow

### Making Changes to the Web App

1. **Edit your React code** in the `src/` directory

2. **Rebuild the web app**:
   ```bash
   npm run build
   ```

3. **Sync changes to native projects**:
   ```bash
   npm run cap:sync
   ```

4. **Reload the app** in your emulator/simulator or rebuild in Android Studio/Xcode

### Live Reload (Development Mode)

For faster development, you can use live reload:

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Note the local URL** (e.g., `http://localhost:5173`)

3. **Update `capacitor.config.json`** temporarily:
   ```json
   {
     "server": {
       "url": "http://localhost:5173",
       "cleartext": true
     }
   }
   ```

4. **Sync and run**:
   ```bash
   npm run cap:sync
   ```

5. **Remember to remove the server config** before building for production!

## Building for Production

### Android APK

1. **Open Android Studio**
   ```bash
   npm run cap:open:android
   ```

2. **Build APK**:
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK will be in `android/app/build/outputs/apk/debug/`

### Android App Bundle (for Play Store)

1. **Build bundle**:
   - Build → Build Bundle(s) / APK(s) → Build Bundle(s)
   - AAB will be in `android/app/build/outputs/bundle/release/`

### iOS App (for App Store)

1. **Open Xcode**
   ```bash
   npm run cap:open:ios
   ```

2. **Archive the app**:
   - Product → Archive
   - Follow the distribution wizard

## Troubleshooting

### Android Issues

**Gradle sync failed**
- Check your internet connection
- Try: File → Invalidate Caches / Restart in Android Studio

**App won't install on device**
- Make sure USB debugging is enabled
- Try: `adb devices` to verify device is connected

**White screen on launch**
- Check that you ran `npm run build` before syncing
- Verify `dist/` folder exists and contains files

### iOS Issues

**CocoaPods not found**
- Install: `sudo gem install cocoapods`
- Run: `cd ios/App && pod install`

**Signing errors**
- Make sure you have a valid Apple Developer account
- Configure signing in Xcode project settings

**App crashes on launch**
- Check Xcode console for error messages
- Verify web assets were copied: `ios/App/App/public/`

### General Issues

**Changes not appearing**
- Make sure you ran `npm run build`
- Make sure you ran `npm run cap:sync`
- Try cleaning and rebuilding in Android Studio/Xcode

**Port already in use (dev mode)**
- Kill the process using the port
- Or change the port in `vite.config.js`

## App Store Deployment

### Google Play Store (Android)

1. Create a Google Play Developer account ($25 one-time fee)
2. Build a signed release AAB
3. Upload to Play Console
4. Fill in store listing details
5. Submit for review

### Apple App Store (iOS)

1. Enroll in Apple Developer Program ($99/year)
2. Create an App ID in Apple Developer portal
3. Archive and upload via Xcode
4. Fill in App Store Connect details
5. Submit for review

## Useful Commands

```bash
# Install dependencies
npm install

# Build web app
npm run build

# Sync web assets to native projects
npm run cap:sync

# Open Android project
npm run cap:open:android

# Open iOS project
npm run cap:open:ios

# Development server
npm run dev
```

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [Xcode Guide](https://developer.apple.com/xcode/)
- [React Documentation](https://react.dev)

## Need Help?

If you encounter issues not covered here:
1. Check the [Capacitor Community Forum](https://forum.ionicframework.com/c/capacitor)
2. Search [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)
3. Review the [Capacitor GitHub Issues](https://github.com/ionic-team/capacitor/issues)
