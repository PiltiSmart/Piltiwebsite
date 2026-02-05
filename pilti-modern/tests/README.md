# Playwright Testing

This directory contains end-to-end (E2E) tests for the PiltiSmart website using Playwright.

## Running Tests Locally

### Prerequisites
- Node.js installed
- Dependencies installed (`npm install`)

### Commands

**Run all tests (headless mode):**
```bash
npm run test:e2e
```

**Run tests with UI mode (interactive):**
```bash
npm run test:e2e:ui
```

**Run tests in headed mode (see browser):**
```bash
npm run test:e2e:headed
```

**Debug tests:**
```bash
npm run test:e2e:debug
```

**Run specific test file:**
```bash
npx playwright test tests/homepage.spec.ts
```

**Run tests in specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Structure

### Test Files

- **`homepage.spec.ts`** - Tests for homepage functionality
  - Page load
  - Hero section visibility
  - Navigation menu
  - Footer with version
  - Mobile responsiveness

- **`navigation.spec.ts`** - Tests for page navigation
  - Navigate to different pages
  - Back button functionality
  - Navigation state persistence

- **`theme.spec.ts`** - Tests for theme toggle
  - Dark mode toggle
  - Light mode toggle
  - Theme persistence across pages

- **`contact-form.spec.ts`** - Tests for contact form
  - Form field presence
  - Email validation
  - Form submission
  - Empty form prevention

## Writing New Tests

1. Create a new `.spec.ts` file in the `tests/` directory
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
   ```
3. Write your tests using `test.describe()` and `test()`:
   ```typescript
   test.describe('Feature Name', () => {
     test('should do something', async ({ page }) => {
       await page.goto('/');
       // Your test code
     });
   });
   ```

## CI/CD Integration

Tests run automatically on:
- Every push to `main` branch
- Every pull request
- Manual workflow dispatch

### Viewing Test Results in GitHub Actions

1. Go to the **Actions** tab in your repository
2. Click on the **Playwright Tests** workflow
3. View test results and download artifacts (screenshots, videos, HTML report)

## Debugging Failed Tests

### Locally

1. Run in debug mode:
   ```bash
   npm run test:e2e:debug
   ```
2. Use Playwright Inspector to step through tests

### In CI

1. Download test artifacts from GitHub Actions
2. Open `playwright-report/index.html` to view the HTML report
3. Check `test-results/` for screenshots and videos of failures

## Configuration

Playwright configuration is in `playwright.config.ts`:
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile viewports**: Pixel 5, iPhone 12
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: On failure
- **Videos**: On failure

## Best Practices

1. **Use semantic selectors**: Prefer `getByRole()`, `getByText()`, `getByLabel()` over CSS selectors
2. **Wait for elements**: Use `waitForLoadState()`, `waitForURL()`, etc.
3. **Keep tests independent**: Each test should work in isolation
4. **Use descriptive test names**: Clearly describe what the test validates
5. **Avoid hard-coded waits**: Use Playwright's auto-waiting features

## Troubleshooting

**Tests fail locally but pass in CI (or vice versa):**
- Check for timing issues
- Ensure dev server is running (`npm run dev`)
- Clear `.next` cache and rebuild

**Flaky tests:**
- Add proper waits (`waitForLoadState`, `waitForSelector`)
- Increase timeout if needed
- Check for race conditions

**Browser not found:**
```bash
npx playwright install
```
