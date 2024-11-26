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