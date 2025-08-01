import { NextRequest, NextResponse } from 'next/server'
import * as Auth0 from 'auth0'
import { auth0Client, isNullOrEmpty } from '@/js/auth/mobile'
import { withMobileAuth } from '@/js/auth/withMobileAuth'
import { errorHandler } from './errorHandler'

/**
 * Mobile login handler
 */
async function postHandler (request: NextRequest): Promise<NextResponse> {
  let username: string, password: string
  try {
    const data = await request.json()
    username = data.username
    password = data.password

    if (isNullOrEmpty(username) || isNullOrEmpty(password)) {
      console.error('Empty username/password!')
      throw new Error('Invalid payload')
    }
  } catch (err) {
    console.error('POST /login error:', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 400 })
  }

  let response: Auth0.JSONApiResponse<Auth0.TokenSet> | undefined
  try {
    response = await auth0Client.oauth.passwordGrant({
      username,
      password,
      scope: 'offline_access access_token_authz openid email profile read:current_user create:current_user_metadata update:current_user_metadata read:stats update:area_attrs',
      audience: 'https://api.openbeta.io',
      realm: 'Username-Password-Authentication'
    })
    return NextResponse.json({ ...response.data }, { status: response.status })
  } catch (error) {
    return errorHandler(error)
  }
}

export const POST = withMobileAuth(postHandler)
