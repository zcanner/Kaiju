/**
 * post type definition for the client.
 */
export type TPost = {
  _id?: string;
  content?: string;
  isReply?: boolean;
  image?: string | null;
  likes?: string[];
  author?: string;
  affiliatedPost?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
