import { test, expect } from "@playwright/test";

test.describe("Interactive Telemetry Simulators", () => {
    
    test("should load and interact with the Smart Home SmartySwitch™ simulator", async ({ page }) => {
        // Visit Smart Home page
        await page.goto("/products/smart-home");
        await page.waitForLoadState("networkidle");

        // Verify page loads fully
        await expect(page.locator("h1")).toContainText(/Intelligent Living/i);

        // Verify initial healthy reading
        await expect(page.locator("text=HEALTHY").first()).toBeVisible();

        // 1. Trigger the overcurrent trip anomaly
        const slider = page.locator("input[type='range']").first();
        
        // Slide current load to 16 Amps (safety trip limit is >=15A)
        await slider.fill("16");
        await page.waitForTimeout(500);

        // Verify the overcurrent fault message is visible
        await expect(page.locator("text=AUTOMATIC CUTOFF TRIPPED")).toBeVisible();
        await expect(page.locator("text=FAULT DETECTED").first()).toBeVisible();
        await expect(page.locator("text=Offline (Off)")).toBeVisible();

        // 2. Reset the fuse
        const resetBtn = page.locator("text=Reset Fuse");
        await expect(resetBtn).toBeVisible();
        await resetBtn.click();

        // Verify it is operational again
        await expect(page.locator("text=HEALTHY").first()).toBeVisible();
        await expect(page.locator("text=Operational (On)")).toBeVisible();
    });

    test("should load and interact with the Smart Farming closed-loop irrigation simulator", async ({ page }) => {
        // Visit Smart Farming page
        await page.goto("/products/smart-farming");
        await page.waitForLoadState("networkidle");

        // Verify page loads fully
        await expect(page.locator("h1")).toContainText(/Maximizing Yields/i);

        // Verify initial hydration stable status
        await expect(page.locator("text=HYDRATION STABLE").first()).toBeVisible();

        // 1. Simulate soil moisture depletion below 30%
        const slider = page.locator("input[type='range']").first();
        
        // Deplete moisture to 20%
        await slider.fill("20");
        await page.waitForTimeout(200);

        // Verify automatic irrigation triggers
        await expect(page.locator("text=IRRIGATING ACTIVE").first()).toBeVisible();
        await expect(page.locator("text=AUTOMATIC SOLENOID VALVE OPEN")).toBeVisible();

        // Wait for the automatic replenishment loop to lift moisture past 65% and restore stable status
        await page.waitForTimeout(6000); // 3% every 500ms means roughly 7.5 seconds for full 45% lift, let's wait to see recovery
        
        // Verify it returns to stable status
        await expect(page.locator("text=HYDRATION STABLE").first()).toBeVisible();
    });

    test("should load and interact with the Smart Office occupancy presence calibrator", async ({ page }) => {
        // Visit Smart Office page
        await page.goto("/products/smart-office");
        await page.waitForLoadState("networkidle");

        // Verify page loads fully
        await expect(page.locator("h1")).toContainText(/Adaptive Workplace/i);

        // Toggling rooms presence should dynamically recalculate utility load and savings ratio
        const openOfficeCard = page.locator("text=Main Open Workspace").first();
        await openOfficeCard.click(); // Toggle Main Open Workspace to vacant (turns it off)
        await page.waitForTimeout(500);

        // Confirm utility savings dial displays high savings ratio
        const savingsPercentageText = page.locator("text=Utility Savings").locator("xpath=preceding-sibling::span").first();
        const percentage = await savingsPercentageText.textContent();
        expect(Number(percentage?.replace("%", ""))).toBeGreaterThan(40); // Dimming open workspace saves huge %
    });

    test("should load and interact with the Smart Industrial vibration anomaly simulator", async ({ page }) => {
        // Visit Smart Industrial page
        await page.goto("/products/smart-industrial");
        await page.waitForLoadState("networkidle");

        // Verify page loads fully
        await expect(page.locator("h1")).toContainText(/IIoT Diagnostics/i);
        await expect(page.locator("text=OPTIMAL OPERATIONS").first()).toBeVisible();

        // 1. Toggle Anomaly Spike
        const anomalyToggle = page.locator("#anomaly-spike-toggle");
        await anomalyToggle.click();
        await page.waitForTimeout(1000);

        // Verify SCADA warning is shown
        await expect(page.locator("text=PREDICTIVE ALARM TRIPPED")).toBeVisible();
        await expect(page.locator("text=HARMONIC DISSIPATION FAULT").first()).toBeVisible();

        // 2. Emergency E-Stop E-stop motor shutdown
        const eStopBtn = page.locator("#estop-motor-button");
        await expect(eStopBtn).toBeVisible();
        await eStopBtn.click();
        await page.waitForTimeout(500);

        // Verify standby is active
        await expect(page.locator("text=SYSTEM STANDBY").first()).toBeVisible();
        await expect(page.locator("text=0 RPM")).toBeVisible();
    });
});
