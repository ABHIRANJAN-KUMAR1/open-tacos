'use client'

import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react'
import Fuse from 'fuse.js'
import clx from 'classnames'
import Link from 'next/link'
import { CountrySummaryType } from '../../js/types'

interface AreaPageProps {
  countries: CountrySummaryType[]
}

interface CountryProps {
  item: CountrySummaryType
}

type FuseReturnType = CountryProps[]

const ClientBody = ({ countries }: AreaPageProps): JSX.Element => {
  const [filtered, setFilter] = useState<FuseReturnType>([])

  useEffect(() => {
    setFilter(countries.map((entry) => ({ item: entry })))
  }, [countries])

  return (
    <section className='max-w-lg mx-auto w-full p-4'>
      <h2>All Countries</h2>
      <div className='mt-8 mb-4 w-full flex lg:justify-end'>
        <FilterBox countries={countries} onChange={setFilter} />
      </div>
      <div className='py-8 flex gap-4 flex-wrap'>{filtered.map(Country)}</div>
    </section>
  )
}

const Country = ({ item }: CountryProps): JSX.Element => {
  const { areaName, uuid, totalClimbs } = item
  return (
    (
      <Link key={uuid} href={`/crag/${uuid}`}>

        <button
          className={clx(
            'btn  btn-sm gap-4',
            totalClimbs > 0 ? '' : 'btn-outline'
          )}
        >
          {areaName}
          <div
            className={clx(
              'badge',
              totalClimbs > 0 ? 'badge-info' : 'badge-ghost'
            )}
          >
            {totalClimbs}
          </div>
        </button>

      </Link>
    )
  )
}

interface FilterBoxProps {
  countries: CountrySummaryType[]
  onChange: (filteredList: FuseReturnType) => void
}

/**
 * A simple list filter
 */

const FilterBox = ({ countries, onChange }: FilterBoxProps): JSX.Element => {
  const [value, setValue] = useState('')
  const options = {
    includeScore: false,
    threshold: 0.3,
    keys: ['areaName']
  }
  const fuse = new Fuse(countries, options)

  useEffect(() => {
    onChange(countries.map((entry) => ({ item: entry }))) // show full list on mount
  }, [countries, onChange])

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.value
    setValue(newValue)

    if (newValue == null || newValue?.length === 0) {
      onChange(countries.map((entry) => ({ item: entry }))) // no filter --> show the whole list
      return
    }

    onChange(fuse.search(newValue))
  }

  return (
    <div className='form-control'>
      <label className='input-group'>
        <span className='text-sm'>Filter</span>
        <input
          type='text'
          placeholder='Type a country name'
          className='focus:outline-0 input input-sm input-bordered'
          onChange={onChangeHandler}
          value={value}
        />
      </label>
    </div>
  )
}

export default ClientBody
