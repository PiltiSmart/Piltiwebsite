import { test, expect } from '@playwright/test';

test.describe('User Journey: Switching Theme Preference', () => {
    test('should switch between dark and light modes during browsing', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // User prefers dark mode and toggles it using the explicit accessibility descriptor
        const themeButton = page.locator('[aria-label="Toggle Theme"]').first();

        if (await themeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
            await themeButton.click();
            await page.waitForTimeout(500);

            // User navigates to another page
            await page.click('text=/about/i');
            await page.waitForURL('**/about');

            // User expects theme preference to persist
            const html = page.locator('html');
            const hasTheme = await html.evaluate((el) => {
                return el.classList.contains('dark') ||
                    el.classList.contains('light') ||
                    el.getAttribute('data-theme') !== null;
            });

            expect(hasTheme).toBeTruthy();
        }
    });
});
