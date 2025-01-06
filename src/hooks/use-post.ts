import { Comment, commentApi } from '@/api/comment-api'
import { Post, postApi } from '@/api/post-api'
import { QueryKeys } from '@/constants/query-keys'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const usePosts = (
  currentPage: number,
  options?: Omit<UseQueryOptions<Post[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<Post[], Error>({
    ...options,
    staleTime: 4000,
    queryKey: [QueryKeys.POST_LIST, currentPage],
    queryFn: () => postApi.getPosts(currentPage),
  })
}
export const useComments = (
  postId: number,
  options?: Omit<UseQueryOptions<Comment[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<Comment[], Error>({
    ...options,
    staleTime: 4000,
    enabled: !!postId,
    queryKey: [QueryKeys.COMMENT_LIST, postId],
    queryFn: () => commentApi.getComments(postId),
  })
}
