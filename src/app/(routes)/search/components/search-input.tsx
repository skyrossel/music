'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import qs from 'query-string'
import { useDebounce } from '@/hooks/use-debounce'
import { Input } from '@/components/ui/input'

const SearchInput = () => {
  const router = useRouter()

  const [value, setValue] = useState('')

  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }

    const url = qs.stringifyUrl({
      url: '/search?title=',
      query,
    })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="What do you want to listen to"
    />
  )
}

export default SearchInput
