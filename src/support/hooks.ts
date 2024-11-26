import { BeforeAll } from '@cucumber/cucumber';
import { launchEmulator } from './launchEmulator';

BeforeAll(async function () {
  await launchEmulator();
  // Wait for simulator to fully boot
  await new Promise((resolve) => setTimeout(resolve, 30000));
});