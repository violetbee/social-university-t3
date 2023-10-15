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
      <Category params={params} />
      {children}
    </>
  );
}
