import { League_Spartan } from "next/font/google";
// import RightSideBar from "./SideBar/RightSideBar";
import Header from "../Header/Header";
import { useSession } from "next-auth/react";
import LeftSideBar from "../sidebar/LeftSideBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { setUniversityId } from "../../store/slices/universitySlice";
import Footer from "../Footer";

const dosis = League_Spartan({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const dispatch = useDispatch();

  const { data: universityData } = trpc.user.getUserUniversityById.useQuery();

  useEffect(() => {
    if (data?.user?.id) {
      dispatch(setUniversityId(universityData?.university?.id as string));
    }
  }, [data?.user, dispatch, universityData?.university?.id]);

  return (
    <>
      <Header />
      <main
        className={`${dosis.className} flex h-full w-full bg-background dark:bg-darkBackground`}
      >
        <LeftSideBar />
        <div className="h-full w-full overflow-y-scroll">
          <div className="mx-auto flex h-full max-w-[1700px] flex-col gap-12 p-5 lg:px-16 lg:py-8">
            {children}
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
