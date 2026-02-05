import { test, expect } from '@playwright/test';

test.describe('User Journey: Discovering the Platform', () => {
    test('should successfully load and explore the homepage', async ({ page }) => {
        // User visits the website for the first time
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Verify page loaded successfully
        await expect(page).toHaveTitle(/PiltiSmart|Pilti/i);

        // User scrolls through the page to see all content
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await page.waitForTimeout(500);

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        // User checks the footer for version/company info
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
    });

    test('should work on mobile devices', async ({ page, isMobile }) => {
        if (!isMobile) {
            test.skip();
        }

        // Mobile user visits the site
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Mobile user can navigate
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
    });
});

test.describe('User Journey: Exploring Different Sections', () => {
    test('should browse through main sections of the website', async ({ page }) => {
        await page.goto('/');

        // User explores different sections
        const sections = ['about', 'services', 'careers', 'download'];

        for (const section of sections) {
            const link = page.locator(`text=/${section}/i`).first();
            if (await link.isVisible({ timeout: 1000 }).catch(() => false)) {
                await link.click();
                await page.waitForURL(`**/${section}`);
                await page.waitForLoadState('networkidle');

                // Verify user successfully navigated
                await expect(page).toHaveURL(new RegExp(section));

                // Go back to homepage for next iteration
                await page.goto('/');
            }
        }
    });
});
