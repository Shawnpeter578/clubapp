---
description: Simple ways to run the app on your Android phone
---

# Run Club App on Your Phone - Easy Methods

## Method 1: Access via Browser (EASIEST - Works Right Now!)

This is the quickest way to test your app on your phone without any installation.

### Steps:

1. **Make sure your phone and computer are on the same WiFi network**

2. **Start the development server:**
   // turbo
   ```bash
   cmd /c npm run dev
   ```

3. **On your phone:**
   - Open any browser (Chrome, Firefox, etc.)
   - Go to: **http://192.168.0.106:5173**
   - Your app will load just like a website!

4. **Add to Home Screen (Optional):**
   - In Chrome: Tap the menu (⋮) → "Add to Home screen"
   - This makes it feel like a native app!

### Pros:
- ✅ Works immediately
- ✅ No installation needed
- ✅ Changes reflect instantly (just refresh)
- ✅ No USB cable needed

### Cons:
- ❌ Only works when dev server is running
- ❌ Requires same WiFi network
- ❌ Not a "real" installed app

---

## Method 2: Build and Install APK (For Permanent Installation)

This creates an actual Android app file (.apk) that you can install permanently.

### Prerequisites:
- Android Studio must be installed
- Java Development Kit (JDK) must be installed

### Steps:

1. **Build your web app:**
   ```bash
   cmd /c npm run build
   ```

2. **Sync with Capacitor:**
   ```bash
   cmd /c npm run cap:sync
   ```

3. **Build the APK:**
   ```bash
   .\android\gradlew.bat -p .\android assembleDebug
   ```

4. **Find the APK:**
   - Location: `android\app\build\outputs\apk\debug\app-debug.apk`
   - This is your installable app file!

5. **Transfer to your phone:**
   - **Option A**: Email the APK to yourself
   - **Option B**: Upload to Google Drive and download on phone
   - **Option C**: Use USB cable to copy to phone's Downloads folder
   - **Option D**: Use a file sharing app (Nearby Share, ShareIt, etc.)

6. **Install on your phone:**
   - Open the APK file on your phone
   - You may need to enable "Install from unknown sources" in Settings
   - Tap "Install"
   - Done! The app is now installed permanently

### Pros:
- ✅ Permanent installation
- ✅ Works offline
- ✅ Feels like a real app
- ✅ Can share with others

### Cons:
- ❌ Requires rebuild for every change
- ❌ More complex setup

---

## Method 3: Use Capacitor Live Reload (Best of Both Worlds)

This method installs the app but loads content from your dev server for instant updates.

### Steps:

1. **Start your dev server:**
   ```bash
   cmd /c npm run dev
   ```

2. **Update `capacitor.config.json`:**
   ```json
   {
     "appId": "com.clubapp.mobile",
     "appName": "Club App",
     "webDir": "dist",
     "server": {
       "url": "http://192.168.0.106:5173",
       "cleartext": true
     }
   }
   ```

3. **Sync and build:**
   ```bash
   cmd /c npm run cap:sync
   .\android\gradlew.bat -p .\android assembleDebug
   ```

4. **Install the APK** (same as Method 2, step 5-6)

5. **Develop with live reload:**
   - Make changes in your code
   - App updates automatically!

6. **Before final build, remove the server config from `capacitor.config.json`**

---

## Quick Troubleshooting

### "Can't access http://192.168.0.106:5173"
- Make sure dev server is running (`npm run dev`)
- Check that phone and computer are on same WiFi
- Try turning off Windows Firewall temporarily
- Your IP might have changed, run `ipconfig` to check

### "Can't install APK"
- Enable "Install unknown apps" for your browser/file manager
- Settings → Security → Install unknown apps → Enable for Chrome/Files

### "APK build failed"
- Make sure Android Studio is installed
- Check that JAVA_HOME environment variable is set
- Try opening the project in Android Studio first

---

## Recommended Workflow

**For Development:**
Use **Method 1** (Browser) - fastest and easiest

**For Testing:**
Use **Method 3** (Live Reload) - feels like real app but updates instantly

**For Distribution:**
Use **Method 2** (APK) - share with friends or publish
