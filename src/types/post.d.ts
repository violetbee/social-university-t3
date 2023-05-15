import {
  Category,
  Class,
  ClassLevel,
  Department,
  Post,
  User,
} from "@prisma/client";

export interface IPostSlicer {
  app: {
    isShareOpen: boolean;
  };
}

export interface IPost {
  post: Post & {
    user: User;
    category: Category | null;
    publishedTimeAgo: string;
    department: Department | null;
    class: Class | null;
    classLevel: ClassLevel | null;
  };
}
