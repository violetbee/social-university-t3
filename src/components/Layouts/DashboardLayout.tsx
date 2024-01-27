import MenuSection from "../dashboard/MenuSection";
import { IMenuSectionProps } from "../../types/app";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params?: IMenuSectionProps;
}) {
  return (
    <>
      <MenuSection />
      {children}
    </>
  );
}
