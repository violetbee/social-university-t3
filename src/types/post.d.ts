import {
  Category,
  Class,
  ClassLevel,
  Department,
  DocTypePost,
  Like,
  TextTypePost,
  User,
} from "@prisma/client";

export interface IPostSlicer {
  app: {
    isShareOpen: boolean;
  };
}

export type ITextPost = TextTypePost & {
  category: Category | null;
};

export type IDocPost = DocTypePost & {
  department: Department | null;
  class: Class | null;
  classLevel: ClassLevel | null;
  files: File[];
};

export type IPost = {
  user: User;
  likes: Like[];
  timeAgo: string;
} & (ITextPost & IDocPost);
