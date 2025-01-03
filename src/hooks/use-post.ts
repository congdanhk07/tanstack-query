import { Comment, commentApi } from '@/api/comment-api'
import { Post, postApi } from '@/api/post-api'
import { QueryKeys } from '@/constants/query-keys'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const usePosts = (options?: Omit<UseQueryOptions<Post[], Error>, 'queryKey' | 'queryFn'>) => {
  return useQuery<Post[], Error>({
    ...options,
    queryKey: [QueryKeys.POST_LIST],
    queryFn: () => postApi.getPosts(),
  })
}
export const useComments = (
  postId: number,
  options?: Omit<UseQueryOptions<Comment[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<Comment[], Error>({
    ...options,
    enabled: !!postId,
    queryKey: [QueryKeys.COMMENT_LIST, postId],
    queryFn: () => commentApi.getComments(postId),
  })
}
