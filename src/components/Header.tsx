import React from 'react'

import MobileTabletAppBar from './MobileAppBar'
import DesktopAppBar from './DesktopAppBar'
import useResponsive from '../js/hooks/useResponsive'
import PhotoUploadError from './media/PhotoUploadError'
import { userMediaStore } from '../js/stores/media'

const NAV_BAR_IDENTIFIER = 'tacos-nav-bar'

interface HeaderProps {
  showFilterBar?: boolean
}

/**
 * @deprecated - This component may be replaced by a unified AppBar in future versions.
 */
export default function Header({ showFilterBar = false }: HeaderProps): JSX.Element {
  const { isTablet, isMobile } = useResponsive()
  const includeFilters = Boolean(showFilterBar)
  const photoUploadErrorMessage = userMediaStore.use.photoUploadErrorMessage()
  const isPhotoError = Boolean(photoUploadErrorMessage)

  return (
    <>
      {isPhotoError && (
        <PhotoUploadError photoUploadErrorMessage={photoUploadErrorMessage!} />
      )}
      <div id={NAV_BAR_IDENTIFIER} className="relative z-40">
        {isTablet || isMobile ? (
          <MobileTabletAppBar isTablet={isTablet} includeFilters={includeFilters} />
        ) : (
          <DesktopAppBar showFilterBar={includeFilters} />
        )}
      </div>
    </>
  )
}

export const getNavBarOffset = (): number => {
  if (typeof document === 'undefined') return 0
  return document.getElementById(NAV_BAR_IDENTIFIER)?.offsetHeight ?? 0
}
