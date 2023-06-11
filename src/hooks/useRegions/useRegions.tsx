import useSWRImmutable from 'swr/immutable'
import { REGIONS_URL } from '../../constants/constants.ts'
import { TypeResponse } from '../../types/types.ts'

type Region = {
  iso: string
  name: string
}

export const useRegions = () => {
  const {
    data: { data: regions } = {},
    isLoading,
    error,
  } = useSWRImmutable<TypeResponse<Region[]>>(REGIONS_URL)
  return { data: regions, isLoading, error }
}
