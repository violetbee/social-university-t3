import CategoryAndMenuSection from "../Dashboard/SearchBarSection";
import ShareAnyTypePost from "../Dashboard/PublishPostSection";
import Category from "../Dashboard/CategoriesSection";
import { ICategoryProps } from "../../types/app";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: ICategoryProps;
}) {
  return (
    <>
      <CategoryAndMenuSection />
      <ShareAnyTypePost />
      <Category params={params} />
      {children}
    </>
  );
}
