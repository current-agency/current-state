import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('unauthenticated homepage redirects to sign-in', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    await expect(page).toHaveURL(/\/signin/)
    await expect(page.locator('h1').first()).toHaveText('Sign in')
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible()
  })

  test('unauthenticated dashboard redirects to sign-in', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')

    await expect(page).toHaveURL(/\/signin/)
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible()
  })

  test('sign-in page is publicly accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/signin')

    await expect(page).toHaveURL(/\/signin/)
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible()
  })
})
