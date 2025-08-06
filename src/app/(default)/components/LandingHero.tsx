'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { AppAlert } from '@/components/broadcast/AppAlert'
import { SignupButton } from './DesktopHeader'

const STORAGE_KEY_JOIN_US = 'suppress-join-us-banner'
const STORAGE_KEY_TEST_AREA = 'suppress-test-area-banner'

const TEST_AREA_ID = process.env.NEXT_PUBLIC_TEST_AREA_ID ?? '18c5dd5c-8186-50b6-8a60-ae2948c548d1'
const TEST_AREA_URL = `/area/${TEST_AREA_ID}/test-area`

export const LandingHero: React.FC = () => {
  const { status } = useSession()

  if (status === 'authenticated') {
    return (
      <AppAlert
        cookieStorageKey={STORAGE_KEY_TEST_AREA}
        message={
          <>
            <h1 className='text-xl tracking-tighter font-bold'>Try out adding a route!</h1>
            <div className='font-medium text-neutral/80'>
              <p>
                You're in the test area — perfect for exploring how everything works.
                <br />Add a route and see it in action!
              </p>
            </div>
            <Link href={TEST_AREA_URL} className='btn btn-accent border-b-2 border-b-neutral'>
              Test Area
            </Link>
          </>
        }
      />
    )
  }

  return (
    <section className='mt-4'>
      <AppAlert
        cookieStorageKey={STORAGE_KEY_JOIN_US}
        message={
          <>
            <h1 className='text-xl tracking-tighter font-bold'>Share your climbing route knowledge!</h1>
            <div className='font-medium text-neutral/80'>
              <p>Join us to help improve this comprehensive <br /> climbing resource for the community.</p>
            </div>
            <SignupButton />
          </>
        }
      />
    </section>
  )
}
