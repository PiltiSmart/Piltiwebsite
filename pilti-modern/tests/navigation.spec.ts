import { test, expect } from '@playwright/test';

test.describe('User Journey: First-time Visitor', () => {
    test('should explore the website as a new visitor', async ({ page }) => {
        // User lands on homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // User sees the main content and decides to learn more about the company
        await page.click('text=/about/i');
        await page.waitForURL('**/about');

        // User reads about page and wants to see services
        await page.click('text=/services/i');
        await page.waitForURL('**/services');

        // User is interested and wants to contact
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');

        // Verify user successfully navigated through the journey
        await expect(page).toHaveURL(/\/contact/);
    });
});

test.describe('User Journey: Exploring Services and Pricing', () => {
    test('should check services and pricing information', async ({ page }) => {
        await page.goto('/');

        // User wants to see what services are offered
        await page.click('text=/services/i');
        await page.waitForURL('**/services');
        await page.waitForLoadState('networkidle');

        // User checks if pricing information is available
        const pricingLink = page.locator('text=/pricing/i').first();
        if (await pricingLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            await pricingLink.click();
            await page.waitForURL('**/pricing');
            await expect(page).toHaveURL(/\/pricing/);
        }
    });
});

test.describe('User Journey: Getting Help', () => {
    test('should navigate to help section', async ({ page }) => {
        await page.goto('/');

        // User needs help and looks for help section
        const helpLink = page.locator('text=/help/i').first();
        if (await helpLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            await helpLink.click();
            await page.waitForURL('**/help');
            await expect(page).toHaveURL(/\/help/);
        }
    });
});

test.describe('User Journey: Returning to Homepage', () => {
    test('should navigate back to homepage from any page', async ({ page }) => {
        // User is on about page
        await page.goto('/about');

        // User clicks logo or home link to return
        const homeLink = page.locator('a[href="/"]').first();
        await homeLink.click();
        await page.waitForURL('/');

        // Verify user is back on homepage
        await expect(page).toHaveURL('/');
    });
});
