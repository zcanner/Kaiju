/**
 * post type definition for the client.
 */
export type TPost = {
  _id?: string;
  content?: string;
  isReply?: boolean;
  comments?: number;
  views?: number;
  image?: string | null;
  likes?: string[];
  author?: {
    _id?: string;
    username?: string;
    fullname?: string;
    email?: string;
    verified?: boolean;
    profileimg?: string;
    posts?: string[];
    bio?: string[];
    followers?: string[];
    following?: string[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  affiliatedPost?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TUser = {
  _id?: string;
  username?: string;
  fullname?: string;
  email?: string;
  verified?: boolean;
  profileimg?: string;
  posts?: string[];
  bio?: string[];
  followers?: string[];
  following?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
