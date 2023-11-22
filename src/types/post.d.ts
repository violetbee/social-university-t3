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
  timeAgo: string;
} & (TextTypePost & DocTypePost & SchoolProps);

export interface IPostSummary {
  id: string;
  title: string;
  category: ICategorySummary | null;
  user: IUserSummary;
}
interface IUserSummary {
  id: string;
  name: string | null;
  surname: string | null;
  image: string | null;
}
interface ICategorySummary {
  name: string;
  color: string | null;
}
