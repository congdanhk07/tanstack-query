// import { fetchComments } from './api'

import { Post } from '@/api/post-api'
import { useComments } from '@/hooks/use-post'

export function PostDetail({ post }: { post: Post }) {
  const { data, isLoading, isError } = useComments(post.id)
  if (isLoading) {
    return <div>Loading comments...</div>
  }
  if (isError) {
    return <div>Error loading posts</div>
  }
  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  )
}
