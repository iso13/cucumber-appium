Step 1: Set Up Environment

1. **Install Node.js and npm**
   - Ensure you have the latest version of Node.js and npm installed. You can install it using Homebrew:
     ```bash
     brew install node
     ```

2. **Install Appium and Appium Doctor**
   - Appium is required for mobile automation. Use npm to install Appium globally:
     ```bash
     npm install -g appium
     ```
   - Install Appium Doctor to verify your system meets the requirements:
     ```bash
     npm install -g appium-doctor
     ```

3. **Install Java JDK and Android Studio**
   - Appium requires Java and Android Studio for Android automation. Download the JDK and Android Studio:
     - JDK: [Oracle JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
     - Android Studio: [Android Studio](https://developer.android.com/studio)

4. **Configure Android Studio**
   - Set up Android SDK in Android Studio and make sure to add the path to your environment variables.
   - Add the following lines to your `.zshrc` or `.bash_profile` (assuming you're using a Mac):
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/tools
     export PATH=$PATH:$ANDROID_HOME/tools/bin
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```
   - Reload the terminal:
     ```bash
     source ~/.zshrc
     ```

5. **Xcode for iOS Testing**
   - For iOS testing, install Xcode from the App Store. Make sure you have Xcode Command Line Tools installed:
     ```bash
     xcode-select --install
     ```
   - Install Carthage for dependency management:
     ```bash
     brew install carthage
     ```

6. **Configure iOS Simulator**
   - Make sure you have the desired iOS Simulator set up in Xcode. You can open Xcode and create a simulator with the desired iOS version and device type.

Step 2: Set Up Cucumber and Appium Project

1. **Create a New Project Directory**
   ```bash
   mkdir cucumber-appium-framework
   cd cucumber-appium-framework
   ```

2. **Initialize the Node.js Project**
   ```bash
   npm init -y
   ```

3. **Install Required Dependencies**
   - Install TypeScript, Cucumber, Appium, and related dependencies:
     ```bash
     npm install --save-dev typescript ts-node @types/node
     npm install --save-dev @cucumber/cucumber
     npm install appium webdriverio
     npm install --save-dev @wdio/types
     ```

4. **Install Appium Service for WebDriverIO**
   ```bash
   npm install --save-dev @wdio/appium-service
   ```

5. **Set Up TypeScript Configuration**
   - Create a `tsconfig.json` file:
     ```json
     {
       "compilerOptions": {
         "target": "ES6",
         "module": "commonjs",
         "strict": true,
         "esModuleInterop": true,
         "outDir": "./dist",
         "rootDir": "./src"
       },
       "include": ["src/**/*.ts"],
       "exclude": ["node_modules"]
     }
     ```

Step 3: Project Structure

1. **Create the Folder Structure**
   ```bash
   mkdir -p src/features src/steps src/support
   ```

2. **Add Cucumber Feature File**
   - Create a feature file `src/features/sample.feature`:
     ```gherkin
     Feature: Sample Mobile Test

       Scenario: Verify app launch on Android
         Given the Android app is launched

       Scenario: Verify app launch on iOS
         Given the iOS app is launched
         Then I should see the home screen
     ```

3. **Add Step Definitions**
   - Create a step definition file `src/steps/sample.steps.ts`:
     ```typescript
     import { Given, Then } from '@cucumber/cucumber';
     import { remote } from 'webdriverio';
     import type { Browser } from 'webdriverio';

     let driver: Browser;

     Given('the Android app is launched', {timeout: 60000}, async () => {
       driver = await remote({
         hostname: 'localhost',
         port: 4723,
         path: '/',
         capabilities: {
           platformName: 'Android',
           'appium:platformVersion': '11.0',
           'appium:deviceName': 'nightwatch-android-11',
           'appium:app': '/Users/davidtran/AndroidStudioProjects/cucumber/app/build/outputs/apk/debug/app-debug.apk',
           'appium:automationName': 'UiAutomator2'
         }
       });
     });

     Given('the iOS app is launched', {timeout: 60000}, async () => {
       driver = await remote({
         hostname: 'localhost',
         port: 4723,
         path: '/',
         capabilities: {
           platformName: 'iOS',
           'appium:platformVersion': '18.1',
           'appium:deviceName': 'iPhone 16 Pro - iOS 18.1',
           'appium:udid': '33A7B371-257F-4656-BF21-7CBD7FBA5972',
           'appium:app': '/Users/davidtran/Library/Developer/Xcode/DerivedData/cucumber-ios-eoneuscdwxovzsftcuopujrjojrw/Build/Products/Debug-iphonesimulator/cucumber-ios.app',
           'appium:automationName': 'XCUITest'
         }
       });
     });

     Then('I should see the home screen', {timeout: 60000}, async () => {
       const homeScreen = await driver.$('~homeScreenElement');
       const isDisplayed = await homeScreen.isDisplayed();
       if (!isDisplayed) {
         throw new Error('Home screen not displayed');
       }
     });
     ```

4. **Create Cucumber Configuration File**
   - Add a configuration file `cucumber.js`:
     ```javascript
     module.exports = {
       default: `--require-module ts-node/register --require src/steps/**/*.ts --require src/features/**/*.feature --publish-quiet --retry 2`
     };
     ```

Step 4: Launch Emulator Programmatically (Optional)

1. **Create a Script to Launch the Emulator (iOS Only)**
   - Create a new file `src/support/launchEmulator.ts` to launch the iOS simulator automatically:
     ```typescript
     import { exec } from 'child_process';

     export function launchEmulator(): Promise<void> {
       return new Promise((resolve, reject) => {
         console.log('Starting iOS simulator...');

         // Replace 'iPhone 16 Pro - iOS 18.1' with your simulator name
         const simulatorName = 'iPhone 16 Pro - iOS 18.1';
         exec(`xcrun simctl boot "${simulatorName}"`, (error, stdout, stderr) => {
           if (error) {
             console.error(`Error starting simulator: ${stderr}`);
             reject(error);
           } else {
             console.log(`Simulator started successfully: ${stdout}`);
             resolve();
           }
         });
       });
     }
     ```

2. **Use a Hook to Launch Emulator Before All Tests**
   - Modify or create a hooks file `src/support/hooks.ts` to launch the emulator before all tests:
     ```typescript
     import { BeforeAll } from '@cucumber/cucumber';
     import { launchEmulator } from './launchEmulator';

     BeforeAll(async function () {
       await launchEmulator();
       // Wait for simulator to fully boot
       await new Promise((resol

