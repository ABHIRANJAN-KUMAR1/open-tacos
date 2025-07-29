import { NextRequest, NextResponse } from 'next/server'

import { withUserAuth } from '@/js/auth/withUserAuth'
import { deleteMediaFromBucket } from '@/js/media/storageClient'
import { getBucketPathFromRequest } from '../get-signed-url/utils'

/**
 * Endpoint for removing a media object from remote cloud storage
 */
const postHandler = async (req: NextRequest): Promise<any> => {
  try {
    const filename = getBucketPathFromRequest(req)
    if (filename == null) {
      return NextResponse.json(
        { error: 'Bad Request - Missing filename parameter' },
        { status: 400 }
      )
    }
    await deleteMediaFromBucket(filename)
    return NextResponse.json(
      { message: 'Media file deleted successfully' },
      { status: 200 }
    )
  } catch (e) {
    console.log('Removing file from media server failed', e)
    return NextResponse.json(
      { error: 'Internal Server Error - Failed to delete media file' },
      { status: 500 }
    )
  }
}

export const POST = withUserAuth(postHandler)
