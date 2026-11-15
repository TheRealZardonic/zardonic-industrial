import type { Metadata } from 'next'
import { LegalPageShell } from '@/app/_components/public/LegalPageShell'
import { BrowsePageShell } from '@/app/_components/public/BrowsePageShell'
import { ReleasesBrowseClient } from '@/app/_components/public/ReleasesBrowseClient'
import { fetchPublicArtistName, fetchPublicReleaseCardItems } from '@/lib/public-fetch'

export const metadata: Metadata = {
  title: 'Releases',
  description: 'Browse the full discography with search and filters.',
}

export const revalidate = 60

export default async function ReleasesBrowsePage() {
  let releases = [] as Awaited<ReturnType<typeof fetchPublicReleaseCardItems>>
  let artistName = 'ZARDONIC'
  let loadFailed = false

  try {
    ;[releases, artistName] = await Promise.all([
      fetchPublicReleaseCardItems(),
      fetchPublicArtistName(),
    ])
  } catch (error) {
    console.error('[releases] browse failed:', error)
    loadFailed = true
  }

  return (
    <LegalPageShell>
      <BrowsePageShell title="Releases" streamLabel="// DISCOGRAPHY.BROWSE">
        {loadFailed ? (
          <p role="alert" className="p-5 text-sm text-zinc-300">The discography is temporarily unavailable. Please retry later.</p>
        ) : (
          <ReleasesBrowseClient releases={releases} artistName={artistName} />
        )}
      </BrowsePageShell>
    </LegalPageShell>
  )
}