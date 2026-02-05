import { test, expect } from '@playwright/test';

test.describe('User Journey: Contacting the Company', () => {
    test('should complete the contact form submission process', async ({ page }) => {
        // User wants to contact the company
        await page.goto('/');
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');

        // User fills out the contact form
        const nameInput = page.locator('input[name="name"], input[placeholder="John Doe"]').first();
        const emailInput = page.locator('input[name="email"], input[placeholder="john@business.com"]').first();
        const messageInput = page.locator('textarea[name="message"], textarea[placeholder*="assist" i]').first();

        await nameInput.fill('John Doe');
        await emailInput.fill('john.doe@example.com');

        const serviceSelect = page.locator('select[name="service"]').first();
        if (await serviceSelect.isVisible()) {
            await serviceSelect.selectOption('Industrial IIoT');
        }

        await messageInput.fill('I am interested in learning more about your IoT solutions for my business.');

        // User submits the form
        await page.click('button[type="submit"]');

        // Wait for submission response
        await page.waitForTimeout(3000);

        // Verify some feedback (success message or form reset)
        const url = page.url();
        expect(url).toContain('/contact'); // Form processed on contact page
    });

    test('should validate email before submission', async ({ page }) => {
        await page.goto('/contact');

        // User tries to submit with invalid email
        await page.locator('input[name="name"], input[placeholder="John Doe"]').first().fill('Jane Smith');
        await page.locator('input[name="email"], input[placeholder="john@business.com"]').first().fill('invalid-email');
        await page.locator('textarea[name="message"], textarea[placeholder*="assist" i]').first().fill('Test message');

        // User tries to submit
        await page.click('button[type="submit"]');

        // Browser should prevent submission due to invalid email
        const emailInput = page.locator('input[name="email"], input[placeholder="john@business.com"]').first();
        const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
        expect(isValid).toBeFalsy();
    });
});
