/** Read failures are not intentionally empty datasets and must not mount editors. */
export type AdminReadResult<T> = { ok: true; data: T } | { ok: false }

export async function loadAdminData<T>(
  operation: string,
  read: () => Promise<T>,
): Promise<AdminReadResult<T>> {
  try {
    return { ok: true, data: await read() }
  } catch (error) {
    console.error('[admin-data] ' + operation + ' failed:', error)
    return { ok: false }
  }
}

export function checkAdminReadError(error: { message: string } | null, operation: string): void {
  if (error) throw new Error(operation + ': ' + error.message)
}
