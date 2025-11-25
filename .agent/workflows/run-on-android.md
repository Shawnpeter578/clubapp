---
description: How to run the app on a physical Android device
---

# Running Club App on Physical Android Device

This guide walks you through deploying and running your React app on a physical Android device using Capacitor.

## Prerequisites

### 1. Install Android Studio
- Download from: https://developer.android.com/studio
- Install with default settings
- Launch Android Studio and complete the setup wizard

### 2. Enable Developer Mode on Your Android Phone
1. Go to **Settings** → **About Phone**
2. Tap **Build Number** 7 times until you see "You are now a developer!"
3. Go back to **Settings** → **System** → **Developer Options**
4. Enable **USB Debugging**

### 3. Install Required Dependencies
Make sure you have all npm packages installed:
```bash
npm install
```

## Step-by-Step Deployment

### Step 1: Build Your Web App
Build the production version of your React app:
```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Step 2: Sync with Capacitor
Sync your web build to the Android platform:
```bash
npm run cap:sync
```

This command:
- Copies your web build to the Android project
- Updates native dependencies
- Syncs Capacitor configuration

### Step 3: Open in Android Studio
Open the Android project in Android Studio:
```bash
npm run cap:open:android
```

Wait for Android Studio to:
- Load the project
- Index files
- Sync Gradle dependencies (this may take a few minutes on first run)

### Step 4: Connect Your Android Device
1. Connect your Android phone to your computer via USB cable
2. On your phone, you'll see a prompt asking to "Allow USB debugging" → Tap **Allow**
3. In Android Studio, you should see your device appear in the device dropdown at the top

### Step 5: Run the App
1. In Android Studio, click the green **Run** button (▶️) or press `Shift + F10`
2. Select your physical device from the list
3. Wait for the app to build and install (first build may take 2-5 minutes)
4. The app will automatically launch on your phone!

## Development Workflow

### Making Changes
After making changes to your React code:

1. **Rebuild the web app:**
   ```bash
   npm run build
   ```

2. **Sync changes:**
   ```bash
   npm run cap:sync
   ```

3. **Re-run in Android Studio:**
   - Click the green Run button again

### Live Reload (Optional)
For faster development, you can configure live reload:

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Find your computer's local IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Example: `192.168.1.100`

3. Update `capacitor.config.json`:
   ```json
   {
     "appId": "com.clubapp.mobile",
     "appName": "Club App",
     "webDir": "dist",
     "server": {
       "url": "http://YOUR_IP:5173",
       "cleartext": true
     }
   }
   ```

4. Sync and run:
   ```bash
   npm run cap:sync
   npm run cap:open:android
   ```

5. Now changes will reflect immediately without rebuilding!

**Important:** Remove the `server.url` configuration before building for production.

## Troubleshooting

### Device Not Showing Up
- Make sure USB debugging is enabled
- Try a different USB cable (some cables are charge-only)
- Revoke USB debugging authorizations and try again
- Check if your device appears in `adb devices` command

### Gradle Build Errors
- In Android Studio: **File** → **Invalidate Caches** → **Invalidate and Restart**
- Delete `android/.gradle` folder and rebuild

### App Crashes on Launch
- Check Android Studio's Logcat for error messages
- Ensure all Capacitor plugins are properly synced
- Verify your `capacitor.config.json` is correct

### White Screen on Launch
- Make sure `npm run build` completed successfully
- Check that `webDir: "dist"` matches your build output folder
- Run `npm run cap:sync` again

## Quick Reference Commands

```bash
# Full deployment workflow
npm run build && npm run cap:sync && npm run cap:open:android

# Just sync changes (after editing native code)
npm run cap:sync

# Open Android Studio
npm run cap:open:android
```

## Next Steps

- **Test on different Android versions** to ensure compatibility
- **Configure app icons and splash screens** in Android Studio
- **Build a signed APK** for distribution when ready
- **Enable ProGuard** for production builds to optimize app size
