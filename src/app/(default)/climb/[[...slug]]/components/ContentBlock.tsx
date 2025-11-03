'use client'
import { useState } from 'react'
import { Climb } from '@/js/types'
import Markdown from 'react-markdown'
import { descriptionHasBetaMarker, removeBetaMarkerFromDescription } from '@/js/utils'

export const ContentBlock: React.FC<Pick<Climb, 'content'>> = ({ content: { description, location, protection } }) => {
  const hasBeta = descriptionHasBetaMarker(description)
  const [showBeta, setShowBeta] = useState<boolean>(hasBeta)

  const renderDescription = () => {
    if (description == null || description.trim() === '') return null

    if (hasBeta && !showBeta) {
      return (
        <div className='p-4 rounded border border-warning/40 bg-warning/10'>
          <div className='flex items-center justify-between'>
            <div>
              <strong>Beta</strong>
              <div className='text-sm text-base-content/70'>This description is marked as beta. It is hidden by default to preserve the onsite experience.</div>
            </div>
            <button className='btn btn-sm btn-outline' onClick={() => setShowBeta(true)}>Show beta</button>
          </div>
        </div>
      )
    }

    const cleaned = hasBeta ? removeBetaMarkerFromDescription(description) : description
    return <Markdown className='wiki-content'>{cleaned}</Markdown>
  }

  return (
    <>
      <div className='mb-3 flex justify-between items-center'>
        <h3>Description</h3>
      </div>
      {renderDescription()}
      {(location?.trim() !== '') && (
        <>
          <h3 className='mb-3 mt-6'>Location</h3>
          <Markdown className='wiki-content'>{location}</Markdown>
        </>
      )}

      {(protection?.trim() !== '') && (
        <>
          <h3 className='mb-3 mt-6'>Protection</h3>
          <Markdown className='wiki-content'>{protection}</Markdown>
        </>
      )}
    </>
  )
}
