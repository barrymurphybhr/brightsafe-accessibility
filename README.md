# brightsafe-accessibility

Automated accessibility testing suite for the BrightSafe dashboard, built with [Playwright](https://playwright.dev/) and [axe-core](https://github.com/dequelabs/axe-core).

## Overview

This project runs end-to-end accessibility scans against the BrightSafe application using the axe-core engine via `@axe-core/playwright`. Tests authenticate as a real user, navigate to the dashboard, and assert that there are no automatically detectable accessibility violations.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

## Installation

```bash
npm install
npx playwright install
```

## Configuration

Create a `.env` file in the project root with the following variables:

```env
BASE_URL=https://your-app-url.com
PLAYWRIGHT_USERNAME=your-email@example.com
PLAYWRIGHT_PASSWORD=your-password
```

## Running Tests

```bash
npx playwright test
```

To view the HTML report after a test run:

```bash
npx playwright show-report
```

## Project Structure

```
├── tests/
│   └── dashboard.spec.ts   # Accessibility test for the dashboard
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── .env                    # Environment variables (not committed)
```

## CI

On CI, tests run with 1 worker and automatic retries (2). Set the `CI` environment variable to enable this behaviour, along with the three `.env` variables above.
