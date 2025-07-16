'use client'

import { useState, useEffect, ChangeEventHandler, ChangeEvent, useMemo } from 'react'
import Fuse from 'fuse.js'
import clx from 'classnames'
import Link from 'next/link'
import { CountrySummaryType } from '@/js/types'

interface AreaPageProps {
  countries: CountrySummaryType[]
}

interface CountryProps {
  item: CountrySummaryType
}

type FuseReturnType = CountryProps[]

const CountryListSection = ({ countries }: AreaPageProps): JSX.Element => {
  const [filtered, setFilter] = useState<FuseReturnType>([])

  useEffect(() => {
    setFilter(countries.map((entry) => ({ item: entry })))
  }, [countries])

  return (
    <section className='mx-auto w-full sm:pt-3 sm:pb-10 default-page-margins'>
      <h2 className='text-3xl text-gray-900 mb-5'>All Countries</h2>
      <div className='mb-8 flex'>
        <FilterBox countries={countries} onChange={setFilter} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
        {filtered.map(({ item }) => (
          <Country key={item.uuid} item={item} />
        ))}
      </div>
    </section>
  )
}

const Country = ({ item }: CountryProps): JSX.Element => {
  const { areaName, uuid, totalClimbs } = item
  return (
    <Link
      href={`/crag/${uuid}`}
      className={clx(
        'group flex items-center justify-between rounded-lg border border-gray-300 px-5 py-3 shadow-sm hover:shadow-md transition-shadow bg-white',
        totalClimbs > 0 ? 'hover:bg-indigo-50' : 'opacity-70 cursor-default'
      )}
      aria-disabled={totalClimbs === 0}
    >
      <span className='text-lg font-semibold text-gray-800 group-hover:text-indigo-600'>
        {areaName}
      </span>
      <span
        className={clx(
          'inline-block rounded-full px-3 py-1 text-sm font-medium',
          totalClimbs > 0 ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-200 text-gray-500'
        )}
      >
        {totalClimbs}
      </span>
    </Link>
  )
}

interface FilterBoxProps {
  countries: CountrySummaryType[]
  onChange: (filteredList: FuseReturnType) => void
}

const FilterBox = ({ countries, onChange }: FilterBoxProps): JSX.Element => {
  const [value, setValue] = useState('')
  const options = {
    includeScore: false,
    threshold: 0.3,
    keys: ['areaName']
  }
  const fuse = useMemo(() => new Fuse(countries, options), [countries])

  useEffect(() => {
    onChange(countries.map((entry) => ({ item: entry }))) // show full list on mount
  }, [countries, onChange])

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.value
    setValue(newValue)

    if (newValue === '') {
      onChange(countries.map((entry) => ({ item: entry }))) // no filter → show all
      return
    }

    onChange(fuse.search(newValue))
  }

  return (
    <div className='w-full max-w-sm'>
      <label htmlFor='filter-input' className='block mb-2 text-sm font-semibold text-gray-700'>
        Filter Countries
      </label>
      <input
        id='filter-input'
        type='text'
        placeholder='Type a country name'
        value={value}
        onChange={onChangeHandler}
        className='
          block
          w-full
          rounded-md
          border
          border-gray-300
          px-4
          py-2
          text-sm
          placeholder-gray-400
          focus:border-indigo-500
          focus:ring
          focus:ring-indigo-300
          focus:outline-none
          transition
          duration-150
          ease-in-out
        '
        autoComplete='off'
        spellCheck='false'
      />
    </div>
  )
}

export default CountryListSection
