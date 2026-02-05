import { test, expect } from '@playwright/test';

test.describe('Comprehensive User Journey: Potential Customer Research', () => {
    test('should thoroughly research the company before making contact', async ({ page }) => {
        // User arrives at homepage from search engine
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        console.log('User landed on homepage');

        // User reads the hero section and main value proposition
        await page.waitForTimeout(2000); // Reading time

        // User scrolls down to see more content
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(1500);

        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(1500);

        // User wants to learn more about the company
        console.log('User clicking About link');
        await page.click('text=/about/i');
        await page.waitForURL('**/about');
        await page.waitForLoadState('networkidle');

        // User reads about page content
        await page.waitForTimeout(3000);
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(2000);

        // User is interested and wants to see what services are offered
        console.log('User navigating to Services');
        await page.click('text=/services/i');
        await page.waitForURL('**/services');
        await page.waitForLoadState('networkidle');

        // User carefully reads through services
        await page.waitForTimeout(2500);
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(2000);

        // User scrolls back up to review
        await page.evaluate(() => window.scrollBy(0, -400));
        await page.waitForTimeout(1000);

        // User checks if there's pricing information
        const pricingLink = page.locator('text=/pricing/i').first();
        if (await pricingLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('User found pricing link, clicking it');
            await pricingLink.click();
            await page.waitForURL('**/pricing');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(3000);

            // User scrolls through pricing options
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(2000);
        }

        // User wants to see if there are career opportunities
        const careersLink = page.locator('text=/careers/i').first();
        if (await careersLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('User checking careers page');
            await careersLink.click();
            await page.waitForURL('**/careers');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
        }

        // User decides to download something or check download page
        const downloadLink = page.locator('text=/download/i').first();
        if (await downloadLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('User visiting download page');
            await downloadLink.click();
            await page.waitForURL('**/download');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
        }

        // User is convinced and ready to make contact
        console.log('User ready to contact, navigating to contact page');
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');
        await page.waitForLoadState('networkidle');

        // User reads contact page information
        await page.waitForTimeout(2000);

        // Verify user successfully completed the research journey
        await expect(page).toHaveURL(/\/contact/);
        console.log('User journey completed successfully');
    });
});

test.describe('Comprehensive User Journey: Mobile User Exploration', () => {
    test('should navigate the site on mobile device', async ({ page, isMobile }) => {
        if (!isMobile) {
            // Simulate mobile viewport
            await page.setViewportSize({ width: 375, height: 667 });
        }

        console.log('Mobile user starting journey');
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Mobile user scrolls through homepage
        await page.waitForTimeout(1500);
        await page.evaluate(() => window.scrollBy(0, 300));
        await page.waitForTimeout(1000);
        await page.evaluate(() => window.scrollBy(0, 300));
        await page.waitForTimeout(1000);

        // Mobile user taps on services via hamburger menu
        await page.click('button.lg\\:hidden.p-2'); // Open menu
        await page.waitForTimeout(500);
        // Specifically look for the link inside the mobile menu container
        await page.locator('.lg\\:hidden ul li >> text=/services/i').first().click();
        await page.waitForURL('**/services');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Mobile user scrolls through services
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(1500);

        // Mobile user goes back to homepage via hamburger menu
        await page.click('button.lg\\:hidden.p-2'); // Open menu
        await page.waitForTimeout(500);
        await page.locator('.lg\\:hidden ul li >> a[href="/"]').first().click();
        await page.waitForURL('/');
        await page.waitForLoadState('networkidle');

        console.log('Mobile user journey completed');
    });
});

test.describe('Comprehensive User Journey: Help-Seeking User', () => {
    test('should find and explore help resources', async ({ page }) => {
        console.log('User needs help, starting at homepage');
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // User looks for help section
        const helpLink = page.locator('text=/help|support|faq/i').first();
        if (await helpLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('User found help link');
            await helpLink.click();
            await page.waitForURL('**/help');
            await page.waitForLoadState('networkidle');

            // User reads through help content
            await page.waitForTimeout(2500);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(2000);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(2000);

            // User might click on help topics if available
            const helpTopics = await page.locator('a').all();
            if (helpTopics.length > 0) {
                // Click first help topic
                const firstTopic = helpTopics[0];
                if (await firstTopic.isVisible().catch(() => false)) {
                    await firstTopic.click();
                    await page.waitForTimeout(2000);
                }
            }
        }

        // If help didn't solve the issue, user goes to contact
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');
        console.log('User navigated to contact for further assistance');
    });
});

test.describe('Comprehensive User Journey: Footer Explorer', () => {
    test('should explore footer links and legal pages', async ({ page }) => {
        console.log('User exploring footer information');
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // User scrolls to footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1500);

        // User checks privacy policy
        const privacyLink = page.locator('text=/privacy/i').first();
        if (await privacyLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('User reading privacy policy');
            await privacyLink.click();
            await page.waitForURL('**/privacy');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(1500);
        }

        // User checks terms of service
        const termsLink = page.locator('text=/terms/i').first();
        if (await termsLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('User reading terms of service');
            await termsLink.click();
            await page.waitForURL('**/terms');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(1500);
        }

        // User checks trademarks page
        const trademarksLink = page.locator('text=/trademark/i').first();
        if (await trademarksLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('User checking trademarks');
            await trademarksLink.click();
            await page.waitForURL('**/trademarks');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1500);
        }

        console.log('User completed footer exploration');
    });
});

test.describe('Comprehensive User Journey: Returning Visitor', () => {
    test('should navigate as a returning visitor checking for updates', async ({ page }) => {
        console.log('Returning visitor checking for updates');

        // Returning visitor goes directly to services
        await page.goto('/services');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Scrolls through to see if there are new services
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(1500);
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(1500);

        // Checks about page for company updates
        await page.click('text=/about/i');
        await page.waitForURL('**/about');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(1500);

        // Goes to homepage to see latest news/updates
        await page.click('a[href="/"]');
        await page.waitForURL('/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        // Scrolls through homepage
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(1000);
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(1000);

        console.log('Returning visitor completed update check');
    });
});

test.describe('Comprehensive User Journey: Comparison Shopper', () => {
    test('should compare different sections multiple times', async ({ page }) => {
        console.log('User comparing different aspects of the service');
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // User goes to services
        await page.click('text=/services/i');
        await page.waitForURL('**/services');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2500);
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(1500);

        // User goes to pricing to compare
        const pricingLink = page.locator('text=/pricing/i').first();
        if (await pricingLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            await pricingLink.click();
            await page.waitForURL('**/pricing');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2500);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(1500);

            // User goes back to services to re-read
            await page.click('text=/services/i');
            await page.waitForURL('**/services');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);

            // User goes back to pricing again
            await page.click('text=/pricing/i');
            await page.waitForURL('**/pricing');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
        }

        // User checks about page to understand company better
        await page.click('text=/about/i');
        await page.waitForURL('**/about');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // User makes decision and goes to contact
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');

        console.log('Comparison shopper completed journey');
    });
});
