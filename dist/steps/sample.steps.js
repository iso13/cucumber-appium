"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const webdriverio_1 = require("webdriverio");
let driver;
(0, cucumber_1.Given)('the Android app is launched', () => __awaiter(void 0, void 0, void 0, function* () {
    driver = yield (0, webdriverio_1.remote)({
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
}));
(0, cucumber_1.Given)('the iOS app is launched', { timeout: 60000 }, () => __awaiter(void 0, void 0, void 0, function* () {
    driver = yield (0, webdriverio_1.remote)({
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
}));
(0, cucumber_1.Then)('I should see the home screen', { timeout: 60000 }, () => __awaiter(void 0, void 0, void 0, function* () {
    const homeScreen = yield driver.$('~homeScreenElement');
    const isDisplayed = yield homeScreen.isDisplayed();
    if (!isDisplayed) {
        throw new Error('Home screen not displayed');
    }
}));
