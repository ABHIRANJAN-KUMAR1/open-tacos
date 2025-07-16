import { CountrySummaryType } from '@/js/types'
import { getAllCountries } from '@/js/graphql/api'
import CountryListSection from './components/CountryListSection'

export default async function Page (): Promise<JSX.Element> {
  let countries: CountrySummaryType[] = []

  try {
    countries = await getAllCountries()
  } catch (e) {
    console.error('Error fetching all countries', e)
  }

  return (
    <CountryListSection countries={countries} />
  )
}
