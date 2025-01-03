import { Post } from '@/api/post-api'
import { PostDetail } from '@/components/post-detail'
import { usePosts } from '@/hooks/use-post'
import { useState } from 'react'

// const maxPostPage = 10

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedPost, setSelectedPost] = useState<Post>({} as Post)

  const { data, isLoading, error } = usePosts()

  if (isLoading) {
    return <div>Loading posts...</div>
  }
  if (error) {
    return <div>Error loading posts: {error.message}</div>
  }
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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  )
}
