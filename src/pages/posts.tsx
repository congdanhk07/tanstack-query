import { Post, postApi } from '@/api/post-api'
import { PostDetail } from '@/components/post-detail'
import { QueryKeys } from '@/constants/query-keys'
import { usePosts } from '@/hooks/use-post'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const maxPostPage = 10

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<Post>({} as Post)
  const queryClient = useQueryClient()
  const { data, isLoading, error } = usePosts(currentPage)

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1
      queryClient.prefetchQuery({
        queryKey: [QueryKeys.POST_LIST, nextPage],
        queryFn: () => postApi.getPosts(nextPage),
      })
    }
    return () => {}
  }, [currentPage, queryClient])

  if (isLoading) return <div>Loading posts...</div>
  if (error) return <div>Error loading posts: {error.message}</div>
  return (
    <>
      <h1>Posts</h1>
      <ol>
        {data?.map((post: Post) => (
          <li key={post.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ol>
      <div className="pages">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage === maxPostPage} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  )
}
