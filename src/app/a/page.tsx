import Layout from '../../components/layout'
import SeoTags from '../../components/SeoTags'
import { CountrySummaryType } from '../../js/types'
import { getAllCountries } from '../../js/graphql/api'
import ClientBody from './ClientBody'
import { ReactElement } from 'react'

const Page = async (): Promise<ReactElement> => {
  let countries: CountrySummaryType[] = []

  try {
    countries = await getAllCountries()
  } catch (e) {
    console.error('Error fetching all countries', e)
  }

  return (
    <>
      <SeoTags title='All countries' />
      <Layout
        showFooter
        showFilterBar={false}
        contentContainerClass='content-default'
      >
        <ClientBody countries={countries} />
      </Layout>
    </>
  )
}

export default Page
