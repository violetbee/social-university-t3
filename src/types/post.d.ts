import {
  Category,
  Class,
  ClassLevel,
  Department,
  DocTypePost,
  File,
  Like,
  TextTypePost,
  University,
  User,
} from "@prisma/client";

export interface IPostSlicer {
  app: {
    isShareOpen: boolean;
  };
}

type SchoolProps = {
  department: Department | null;
  classLevel: ClassLevel | null;
  class: Class | null;
  university: University | null;
};

export type ISinglePost = {
  files: File[] | null;
  likes: Like[];
  category: Category | null;
  user: User & SchoolProps;
} & (TextTypePost & DocTypePost & SchoolProps);
