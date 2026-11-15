import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const read = (p: string) => readFileSync(resolve(process.cwd(), p), 'utf8')

describe('canonical public release fetch contract', () => {
  it('uses one projection for both homepage and browse', () => {
    const lib = read('lib/public-fetch.ts')
    const home = read('app/page.tsx')
    expect(home).toContain('fetchPublicReleaseRows(supabase)')
    expect(home).not.toContain('async function fetchReleases(')
    expect(lib).toContain("from('releases')")
    expect(lib).not.toContain('fallbackSelect')
    expect(lib).not.toContain('error.message.includes')
  })

  it('distinguishes failed discography loads from genuine empty results', () => {
    const lib = read('lib/public-fetch.ts')
    const browse = read('app/releases/page.tsx')
    expect(lib).toContain("throw new Error('Public releases unavailable'")
    expect(browse).toContain('loadFailed')
    expect(browse).toContain('role="alert"')
  })
})
