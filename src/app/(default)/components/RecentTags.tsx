import { RecentImageCard } from '@/app/(default)/components/RecentMediaCard'
import { SectionContainer } from './ui/SectionContainer'
import { getMediaForFeedSC } from '@/js/graphql/gql/serverApi'
import { MediaByUsers, EntityTag } from '@/js/types'

/**
 * Horizontal gallery of recent images with tags
 */
export const RecentTags: React.FC = async () => {
  let recentTagsByUsers: MediaByUsers[] = []
  try {
    recentTagsByUsers = await getMediaForFeedSC(20, 4)
  } catch (error) {
    console.error('Failed to fetch recent tags during build:', error)
    // Continue with empty data if API is down
  }
  const testAreaIds = Array.from(new Set((process.env.NEXT_PUBLIC_TEST_AREA_IDS ?? '').split(',')))
  const mediaWithTags = recentTagsByUsers.flatMap(entry => entry.mediaWithTags)

  const recentMediaWithTags = mediaWithTags.filter(tag => {
    return tag.entityTags.some((entityTag: EntityTag) => {
      return testAreaIds.every(testId => {
        const regex = new RegExp(testId, 'g')
        return !regex.test(entityTag.ancestors)
      })
    })
  })

  return (

    <SectionContainer header={<h2>Latest Photos</h2>}>
      <div className='overflow-hidden bg-base-200/20'>
        <div className='py-4 grid grid-flow-col overflow-x-auto'>
          {
            recentMediaWithTags.map(media => {
              const { mediaUrl } = media
              return (
                <RecentImageCard key={mediaUrl} mediaWithTags={media} bordered />
              )
            }
            )
              }
        </div>
      </div>
    </SectionContainer>
  )
}
