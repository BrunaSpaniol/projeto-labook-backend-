export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLES;
}

export interface TUserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: keyof typeof USER_ROLES;
  created_at: string;
}

export interface TPostDB {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string | null;
  creator_id: string;
  creator_name?: string;
}

export interface PostOutput  {
  id:string  ,
  content:string ,
  likes: number,
  dislikes:number ,
  createdAt:string, 
  updatedAt:string | null, 
  creator: {
      id:string,
      name:string
  }
}

// tipagem para criação (POST) sem balance e created_at
export interface TLikesDislikesDB {
  user_id: string;
  post_id: string;
  like: 1 | 0 | null;
}

export interface Creator {
  id: string;
  name: string;
}

export interface TPostResponse {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
}


export enum LikeInput {
  "true" = 1,
  "false" = 0,
}
