import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('R2 reconciliation request safety', () => {
  it('does not start a full bucket scan from instrumentation', () => {
    expect(existsSync(resolve(process.cwd(), 'instrumentation.ts'))).toBe(false)
    expect(existsSync(resolve(process.cwd(), 'lib/r2-reconcile-on-deploy.ts'))).toBe(false)
  })
  it('keeps GET non-mutating and POST admin-gated', () => {
    const route = readFileSync(resolve(process.cwd(), 'app/api/r2-reconcile/route.ts'), 'utf8')
    expect(route).toContain('export async function GET()')
    expect(route).toContain('status: 405')
    expect(route).toContain('isAdminSession()')
    expect(route).toContain("searchParams.get('dryRun')")
  })
})
