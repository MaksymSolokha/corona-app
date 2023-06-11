import { useCallback, useEffect, useState } from 'react'
import { fetcher } from '../../utils/utils.ts'

export const useMultipleData = <T extends object>(urls: string[]) => {
  const [isLoading, setIsLoading] = useState(!!urls?.length)
  const [data, setData] = useState<T[]>([])
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const responses = (await Promise.all(
        urls.map((url) => fetcher(url))
      )) as T[]
      setData(responses)
    } catch (err) {
      alert(err)
    } finally {
      setIsLoading(false)
    }
  }, [urls])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading }
}
