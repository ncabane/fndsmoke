import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// [Nicolas] Project layout, browser choice, env loading, retries: 0, file cleanup.
// [AI-assisted] userAgent from env; dotenv for .env; trace: retain-on-failure

// Loads the environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Gets the user agent from the environment variables
const FUNDA_USER_AGENT = process.env.FUNDA_USER_AGENT;

// Throws an error if the user agent is not set
if (!FUNDA_USER_AGENT) {
  throw new Error('FUNDA_USER_AGENT env var is not set. See README for setup.');
}

// Defines the test configuration
export default defineConfig({
  // All tests live under ./tests (ui-automation + api-automation)
  testDir: './tests',
  testMatch: [
    'ui-automation/tests/**/*.spec.ts',
    'api-automation/tests/**/*.spec.ts',
  ],
 
  // Runs tests in files in parallel
  fullyParallel: true,
 
  // Fails the build on CI if test.only is used
  forbidOnly: !!process.env.CI,
  retries: 0,
  
  // Opts out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  
  // Uses the list reporter.
  reporter: 'list',
  
  // Shared settings for all the projects below.
  // Retains the trace on failure.
  use: {
    trace: 'retain-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      // Uses Desktop Chrome device settings but overrides the user agent
      use: { 
        ...devices['Desktop Chrome'],
        userAgent: FUNDA_USER_AGENT,
      },
    },
  ],
});
