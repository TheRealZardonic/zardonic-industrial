import { createClient } from '@/lib/supabaseServer'
import { AdminPageHeader } from '@/app/admin/_components/AdminPageHeader'
import BioForm from './BioForm'
import { checkAdminReadError, loadAdminData } from '@/lib/admin-read-state'
import { AdminDataUnavailable } from '@/app/admin/_components/AdminDataUnavailable'

export default async function BioPage() {
  const loaded = await loadAdminData('bio', async () => {
    const supabase = await createClient()
    const { data, error } = await supabase.from('bio').select('content').limit(1).maybeSingle()
    checkAdminReadError(error, 'bio')
    return data?.content ?? ''
  })
  if (!loaded.ok) return <AdminDataUnavailable title="Biography" href="/admin/bio" />
  const content = loaded.data

  return (
    <div className="max-w-2xl">
      <AdminPageHeader
        title="Biography"
        description="Edit the artist biography shown in the Bio section on the public site."
      />
      <BioForm initialContent={content} />
    </div>
  )
}
