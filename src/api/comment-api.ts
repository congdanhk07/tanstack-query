import axiosClient from './axios-client'

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
export const commentApi = {
  getComments: (postId: number): Promise<Comment[]> =>
    axiosClient.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`),
}
