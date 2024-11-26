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