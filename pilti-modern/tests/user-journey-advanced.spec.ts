import { test, expect } from '@playwright/test';

test.describe('Advanced User Journey: Job Seeker Flow', () => {
    test('should explore company and apply for a position', async ({ page }) => {
        console.log('Job seeker starting exploration');

        // Job seeker lands on homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        // Reads about the company first
        await page.click('text=/about/i');
        await page.waitForURL('**/about');
        await page.waitForLoadState('networkidle');
        console.log('Job seeker reading about company');

        // Thoroughly reads about page
        await page.waitForTimeout(3000);
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1500);

        // Looks for careers section
        await page.click('text=/careers/i');
        await page.waitForURL('**/careers');
        await page.waitForLoadState('networkidle');
        console.log('Job seeker on careers page');

        // Reads through available positions
        await page.waitForTimeout(2500);
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(2000);

        // Clicks on any job listing links if available
        const jobLinks = await page.locator('a').all();
        for (let i = 0; i < Math.min(jobLinks.length, 3); i++) {
            const link = jobLinks[i];
            const href = await link.getAttribute('href').catch(() => null);
            if (href && !href.startsWith('http') && href !== '#') {
                await link.click();
                await page.waitForTimeout(1500);
                await page.goBack();
                await page.waitForTimeout(1000);
            }
        }

        // Goes to contact to inquire about positions
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');
        console.log('Job seeker ready to contact HR');
    });
});

test.describe('Advanced User Journey: Technical User Exploring Documentation', () => {
    test('should explore technical resources and download materials', async ({ page }) => {
        console.log('Technical user looking for documentation');

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Technical user looks for download/documentation section
        const downloadLink = page.locator('text=/download|documentation|docs/i').first();
        if (await downloadLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            console.log('Technical user found download section');
            await downloadLink.click();
            await page.waitForURL('**/download');
            await page.waitForLoadState('networkidle');

            // User reads through available downloads
            await page.waitForTimeout(2500);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(2000);

            // User might click on documentation links
            const docLinks = await page.locator('a[href*="help"], a[href*="doc"]').all();
            if (docLinks.length > 0) {
                for (let i = 0; i < Math.min(docLinks.length, 2); i++) {
                    const link = docLinks[i];
                    if (await link.isVisible().catch(() => false)) {
                        await link.click();
                        await page.waitForTimeout(2000);
                        await page.evaluate(() => window.scrollBy(0, 400));
                        await page.waitForTimeout(1500);
                        await page.goBack();
                        await page.waitForTimeout(1000);
                    }
                }
            }
        }

        // User checks help section for technical guides
        const helpLink = page.locator('text=/help/i').first();
        if (await helpLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            await helpLink.click();
            await page.waitForURL('**/help');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(1500);
        }

        console.log('Technical user completed documentation exploration');
    });
});

test.describe('Advanced User Journey: Multi-Tab Comparison', () => {
    test('should simulate user opening multiple sections in sequence', async ({ page }) => {
        console.log('User doing detailed comparison across sections');

        // Start at homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        // User opens services
        await page.click('text=/services/i');
        await page.waitForURL('**/services');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(1500);

        // User goes back to homepage
        await page.goBack();
        await page.waitForURL('/');
        await page.waitForTimeout(1000);

        // User opens about
        await page.click('text=/about/i');
        await page.waitForURL('**/about');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(1500);

        // User goes back again
        await page.goBack();
        await page.waitForURL('/');
        await page.waitForTimeout(1000);

        // User opens pricing
        const pricingLink = page.locator('text=/pricing/i').first();
        if (await pricingLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            await pricingLink.click();
            await page.waitForURL('**/pricing');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            await page.evaluate(() => window.scrollBy(0, 500));
            await page.waitForTimeout(1500);

            // User goes back one more time
            await page.goBack();
            await page.waitForURL('/');
            await page.waitForTimeout(1000);
        }

        // Finally decides to contact
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');

        console.log('Multi-tab comparison journey completed');
    });
});

test.describe('Advanced User Journey: Thorough Reader', () => {
    test('should read through entire website systematically', async ({ page }) => {
        test.slow();
        console.log('Thorough user reading entire website');

        const sections = ['/', '/about', '/services', '/pricing', '/careers', '/download', '/help'];

        for (const section of sections) {
            console.log(`User reading section: ${section}`);
            await page.goto(section);
            await page.waitForLoadState('networkidle').catch(() => { });

            // User reads the page
            await page.waitForTimeout(2000);

            // User scrolls through entire page
            const scrollSteps = 5;
            for (let i = 0; i < scrollSteps; i++) {
                await page.evaluate(() => window.scrollBy(0, 400));
                await page.waitForTimeout(1200);
            }

            // Scroll back to top for next section
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.waitForTimeout(500);
        }

        // After reading everything, user contacts
        await page.goto('/contact');
        await page.waitForLoadState('networkidle');

        console.log('Thorough reader completed entire website');
    });
});

test.describe('Advanced User Journey: Distracted User', () => {
    test('should simulate user getting distracted and coming back', async ({ page }) => {
        console.log('Distracted user journey');

        // User starts on homepage
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);
        await page.evaluate(() => window.scrollBy(0, 300));
        await page.waitForTimeout(1000);

        // User clicks on services
        await page.click('text=/services/i');
        await page.waitForURL('**/services');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        // User gets distracted, goes back to homepage
        await page.click('a[href="/"]');
        await page.waitForURL('/');
        await page.waitForTimeout(1000);

        // User scrolls a bit
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(1000);

        // User clicks about
        await page.click('text=/about/i');
        await page.waitForURL('**/about');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        // User gets distracted again, goes back
        await page.goBack();
        await page.waitForURL('/');
        await page.waitForTimeout(1000);

        // User finally focuses and goes to services again
        await page.click('text=/services/i');
        await page.waitForURL('**/services');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(1500);

        // User decides to contact
        await page.click('text=/contact/i');
        await page.waitForURL('**/contact');

        console.log('Distracted user finally completed journey');
    });
});

test.describe('Advanced User Journey: Speed Reader', () => {
    test('should quickly browse through all sections', async ({ page }) => {
        console.log('Speed reader quickly browsing site');

        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(800);
        await page.evaluate(() => window.scrollBy(0, 1000));
        await page.waitForTimeout(500);

        // Quickly visit each section
        const quickSections = ['about', 'services', 'pricing', 'careers', 'contact'];

        for (const section of quickSections) {
            const link = page.locator(`text=/${section}/i`).first();
            if (await link.isVisible({ timeout: 1000 }).catch(() => false)) {
                await link.click();
                await page.waitForURL(`**/${section}`);
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(1000);
                await page.evaluate(() => window.scrollBy(0, 800));
                await page.waitForTimeout(600);
            }
        }

        console.log('Speed reader completed quick browse');
    });
});
