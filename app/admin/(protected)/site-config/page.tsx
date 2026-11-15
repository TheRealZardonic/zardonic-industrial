import { Suspense } from 'react'
import { createClient } from '@/lib/supabaseServer'
import { AdminPageHeader } from '@/app/admin/_components/AdminPageHeader'
import { SiteConfigTabs } from './SiteConfigTabs'
import { checkAdminReadError, loadAdminData } from '@/lib/admin-read-state'
import { AdminDataUnavailable } from '@/app/admin/_components/AdminDataUnavailable'

export default async function SiteConfigPage() {
  const loaded = await loadAdminData('site-config', async () => {
    const supabase = await createClient()
    const { data, error } = await supabase.from('site_config').select('key, value')
    checkAdminReadError(error, 'site-config')
    return (data ?? []) as Array<{ key: string; value: unknown }>
  })
  if (!loaded.ok) return <AdminDataUnavailable title="Look & Feel" href="/admin/site-config" />

  const rowMap = Object.fromEntries(loaded.data.map((r) => [r.key, r.value]))

  return (
    <div>
      <AdminPageHeader
        title="Look & Feel"
        description="Theme, background, hero, sections and site text. Use split preview to see changes live."
      />
      <Suspense fallback={<p className="text-sm text-zinc-500">Loading editor…</p>}>
        <SiteConfigTabs
          heroValue={(rowMap['hero'] ?? {}) as Record<string, unknown>}
          bgValue={(rowMap['background'] ?? {}) as Record<string, unknown>}
          appearanceValue={(rowMap['appearance'] ?? {}) as Record<string, unknown>}
          sectionsValue={rowMap['sections']}
          newsletterValue={(rowMap['newsletter'] ?? {}) as Record<string, unknown>}
          merchandiseValue={(rowMap['merchandise'] ?? {}) as Record<string, unknown>}
          footerValue={(rowMap['footer'] ?? {}) as Record<string, unknown>}
          advancedConfigs={[]}
        />
      </Suspense>
    </div>
  )
}