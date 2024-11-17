import { NextRequest, NextResponse } from 'next/server'

import { withUserAuth } from '@/js/auth/withUserAuth'
import { deleteMediaFromBucket } from '@/js/media/storageClient'
import { prepareFilenameFromRequest } from '../get-signed-url/route'

/**
 * Endpoint for removing a media object from remote cloud storage
 */
const postHandler = async (req: NextRequest): Promise<any> => {
  try {
    const filename = prepareFilenameFromRequest(req)
    if (filename == null) {
      return NextResponse.json({ status: 400 })
    }
    await deleteMediaFromBucket(filename)
    return NextResponse.json({ status: 200 })
  } catch (e) {
    console.log('Removing file from media server failed', e)
    return NextResponse.json({ status: 500 })
  }
}

export const POST = withUserAuth(postHandler)
