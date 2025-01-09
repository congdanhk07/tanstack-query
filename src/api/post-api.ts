import axiosClient from './axios-client'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const postApi = {
  getPosts: (pageNum = 1): Promise<Post[]> =>
    axiosClient.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`),
  deletePost: (id: number): Promise<void> => axiosClient.delete(`https://jsonplaceholder.typicode.com/posts/${id}`),
  updatePost: (id: number): Promise<void> =>
    axiosClient.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      title: 'Updated title',
    }),
}
