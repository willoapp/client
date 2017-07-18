
// External interfaces
export interface Post {
  id?: string,
  content: string,
  createdAt: string,
  user: User,
  loveCount: number,
  postLoves?: PostLoves
}

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  photoURL: string,
  birthDate: string,
}

// Internal Interfaces

interface PostLoves {
  [key: string]: User
}