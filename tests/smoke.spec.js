const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('launches with expected sources and rugged shell', async ({ page }) => {
  await expect(page.getByRole('heading', { name: "Bill's Mobility" })).toBeVisible();
  await expect(page.locator('#creators .card')).toHaveCount(6);
  await expect(page.locator('#playlists .card')).toHaveCount(5);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(5, 5, 5)');
  await expect(page.getByRole('button', { name: 'Mix it up' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Saved videos/i })).toBeVisible();
});

test('today check persists through reload', async ({ page }) => {
  const today = page.locator('#todayBtn');
  if (await today.textContent() !== '✓ Today') {
    await today.click();
  }
  await today.click();
  await expect(today).toHaveText('✓ Done');
  await page.reload();
  await expect(page.locator('#todayBtn')).toHaveText('✓ Done');
});

test('saved videos dialog opens', async ({ page }) => {
  await page.getByRole('button', { name: /Saved videos/i }).click();
  await expect(page.getByRole('heading', { name: 'Saved videos' })).toBeVisible();
  await expect(page.getByText(/No saved videos yet|My playlist/i).first()).toBeVisible();
});

test('playlist opens with refresh and in-app content area', async ({ page }) => {
  await page.locator('#playlists .card').first().click();
  await expect(page.getByRole('button', { name: /Refresh six/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Open playlist/i })).toBeVisible();
  await expect(page.locator('#sourceContent')).toBeVisible();
});

test('JB23 Fit remains a Shorts source', async ({ page }) => {
  const jb = page.locator('#creators .card').filter({ hasText: 'JB23 Fit' });
  await expect(jb).toContainText('SHORTS');
  await jb.click();
  await expect(page.getByRole('link', { name: /Browse shorts/i })).toBeVisible();
});
