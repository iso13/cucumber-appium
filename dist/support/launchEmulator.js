"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchEmulator = launchEmulator;
const child_process_1 = require("child_process");
function launchEmulator() {
    return new Promise((resolve, reject) => {
        console.log('Starting Android emulator...');
        // Replace 'nightwatch-android-11' with your emulator name
        const emulatorName = 'nightwatch-android-11';
        (0, child_process_1.exec)(`emulator -avd ${emulatorName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error starting emulator: ${stderr}`);
                reject(error);
            }
            else {
                console.log(`Emulator started successfully: ${stdout}`);
                resolve();
            }
        });
    });
}
