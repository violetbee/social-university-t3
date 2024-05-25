import MenuSection from "../dashboard/MenuSection";
import { IMenuSectionProps } from "../../types/app";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params?: IMenuSectionProps;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col p-5 lg:px-16 lg:py-10">
      <MenuSection />
      {children}
    </div>
  );
}
