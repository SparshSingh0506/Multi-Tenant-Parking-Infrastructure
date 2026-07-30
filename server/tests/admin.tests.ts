import { describe, expect, test } from 'vitest'
import app from '../src/app.js'

describe('Admin Tests', () => {
  test('should register a new admin', async () => {
    const res = await app.request('/api/v1/admin/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Admin',
        email: 'testadmin@example.com',
        password: 'password123'
      })
    })

    expect(res.status).toBe(201)
  })
})
 