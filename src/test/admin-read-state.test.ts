import { afterEach, describe, expect, it, vi } from 'vitest'
import { checkAdminReadError, loadAdminData } from '@/lib/admin-read-state'

describe('admin read failure contract', () => {
  afterEach(() => vi.restoreAllMocks())

  it('preserves successful empty reads', async () => {
    expect(await loadAdminData('bio', async () => '')).toEqual({ ok: true, data: '' })
    expect(await loadAdminData('sections', async () => [])).toEqual({ ok: true, data: [] })
  })

  it('does not return editable defaults after backend failures', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(await loadAdminData('bio', async () => { throw new Error('offline') })).toEqual({ ok: false })
  })

  it('propagates returned PostgREST errors from nonthrowing queries', () => {
    expect(() => checkAdminReadError({ message: 'permission denied' }, 'bio')).toThrow('bio: permission denied')
    expect(() => checkAdminReadError(null, 'bio')).not.toThrow()
  })
})
