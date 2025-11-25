# How to Build and Download APK

## The Problem
Your system has **Java 8**, but the Android build requires **Java 11 or higher**.

Error: `compatible with Java 11 and the consumer needed a component for use during runtime, compatible with Java 8`

---

## Solution 1: Use Android Studio to Build APK (EASIEST)

This is the simplest method since Android Studio has its own Java bundled.

### Steps:

1. **Open your project in Android Studio:**
   ```bash
   cmd /c npm run cap:open:android
   ```

2. **Wait for Gradle sync to complete** (bottom status bar)

3. **Build the APK:**
   - Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Or use menu: **Build** → **Generate Signed Bundle / APK** (for release version)

4. **Find your APK:**
   - After build completes, click the notification "locate" link
   - Or manually go to: `android\app\build\outputs\apk\debug\app-debug.apk`

5. **Transfer to your phone:**
   - Email it to yourself
   - Upload to Google Drive
   - Use USB cable to copy to phone
   - Use Nearby Share (Windows 11) or similar

6. **Install on phone:**
   - Open the APK file on your phone
   - Enable "Install from unknown sources" if prompted
   - Tap Install

---

## Solution 2: Install Java 11 or Higher

If you want to build from command line, upgrade your Java version.

### Steps:

1. **Download Java 11 or higher:**
   - **Option A**: [Oracle JDK 17](https://www.oracle.com/java/technologies/downloads/)
   - **Option B**: [OpenJDK 17](https://adoptium.net/) (Free, recommended)

2. **Install Java**
   - Run the installer
   - Follow the installation wizard

3. **Set JAVA_HOME environment variable:**
   - Press `Windows + R`, type `sysdm.cpl`, press Enter
   - Go to **Advanced** → **Environment Variables**
   - Under **System Variables**, click **New**:
     - Variable name: `JAVA_HOME`
     - Variable value: `C:\Program Files\Java\jdk-17` (or your install path)
   - Find **Path** variable → **Edit** → **New** → Add: `%JAVA_HOME%\bin`
   - Click OK on all dialogs

4. **Restart your terminal/PowerShell**

5. **Verify Java version:**
   ```bash
   java -version
   ```
   Should show version 11 or higher

6. **Build the APK:**
   ```bash
   cmd /c npm run build
   cmd /c npm run cap:sync
   .\android\gradlew.bat -p .\android assembleDebug
   ```

7. **Find APK at:**
   `android\app\build\outputs\apk\debug\app-debug.apk`

---

## Solution 3: Use Android Studio's Embedded JDK

Tell Gradle to use Android Studio's bundled Java instead of system Java.

### Steps:

1. **Find Android Studio's JDK path:**
   - Open Android Studio
   - Go to **File** → **Settings** → **Build, Execution, Deployment** → **Build Tools** → **Gradle**
   - Note the **Gradle JDK** path (usually something like `C:\Program Files\Android\Android Studio\jbr`)

2. **Set JAVA_HOME temporarily:**
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
   ```

3. **Build the APK:**
   ```bash
   .\android\gradlew.bat -p .\android assembleDebug
   ```

4. **Find APK at:**
   `android\app\build\outputs\apk\debug\app-debug.apk`

---

## Quick Comparison

| Method | Difficulty | Speed | Notes |
|--------|-----------|-------|-------|
| **Android Studio** | ⭐ Easy | Fast | Recommended - uses bundled Java |
| **Install Java 11** | ⭐⭐ Medium | Fast | Permanent solution |
| **Use Studio JDK** | ⭐⭐⭐ Advanced | Fast | Temporary, needs repeat each session |

---

## After Getting the APK

### Transfer Methods:

**Email:**
- Attach `app-debug.apk` to an email
- Send to yourself
- Open on phone and download

**Google Drive:**
- Upload APK to Drive
- Open Drive app on phone
- Download and install

**USB Cable:**
- Connect phone to PC
- Copy APK to phone's `Downloads` folder
- Use file manager on phone to find and install

**Nearby Share (Windows 11):**
- Right-click APK → Share → Nearby Share
- Select your phone
- Accept on phone and install

### Installing on Phone:

1. Tap the APK file
2. If prompted, go to **Settings** → **Security** → **Install unknown apps**
3. Enable for your browser/file manager
4. Go back and tap APK again
5. Tap **Install**
6. Done! App is now on your phone

---

## Recommended Approach

**For now:** Use **Solution 1** (Android Studio) - it's the easiest and most reliable.

**For future:** Consider installing **Java 17** (Solution 2) for command-line builds.

---

## Current Status

✅ Web app built successfully  
✅ Synced with Capacitor  
❌ APK build blocked by Java 8 requirement  
✅ Dev server running at http://192.168.0.106:5173 (browser access works!)

**You can still use your app via browser on your phone while setting up APK build!**
