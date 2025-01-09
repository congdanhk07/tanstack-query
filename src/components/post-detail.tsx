/* eslint-disable @typescript-eslint/no-explicit-any */
// import { fetchComments } from './api'

import { Post } from '@/api/post-api'
import { useComments } from '@/hooks/use-post'

type Props = {
  post: Post
  deleteMutation: any
  updateMutation: any
}
export function PostDetail({ post, deleteMutation, updateMutation }: Props) {
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
      <div></div>
      {deleteMutation.isPending && <p>Deleting post...</p>}
      {deleteMutation.isError && <p>Error deleting post</p>}
      {deleteMutation.isSuccess && <p>Post deleted successfully</p>}
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {updateMutation.isPending && <p>Updating post...</p>}
      {updateMutation.isError && <p>Error updating post</p>}
      {updateMutation.isSuccess && <p>Post updated successfully</p>}
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
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
