import MenuSection from "../Dashboard/MenuSection";
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
