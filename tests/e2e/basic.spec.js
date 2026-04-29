const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('about:blank');
  expect(true).toBe(true);
});
