/**
 * @description
 * Refetch interval callback.
 * If the transaction is in a final state, do not refetch.
 * Otherwise refetch every 3 seconds.
 * @param {Query} query - TanStack Query instance
 * @returns {number} time in ms between refetches, or false to disable refetching
 */
import { Transaction, tnxApi } from '@/api/tnx-api'
import { QueryKeys } from '@/constants/query-keys'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseTnxDetailsOptions = Omit<UseQueryOptions<Transaction>, 'queryKey' | 'queryFn'>

export const useTnxDetails = (tnxId: string, options?: UseTnxDetailsOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.TNX_DETAILS, tnxId],
    queryFn: () => tnxApi.getDetails(tnxId!),
    enabled: !!tnxId,
    refetchInterval: (query) => {
      const currentStatus = query.state?.data?.status || 'pending'

      if (['completed', 'cancelled', 'failed'].includes(currentStatus)) {
        return false
      }
      return 3000 // 3 seconds
    },
  })
}
