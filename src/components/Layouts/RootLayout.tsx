import { League_Spartan } from "next/font/google";
// import RightSideBar from "./SideBar/RightSideBar";
import Header from "../ui/molecules/header";
import { useSession } from "next-auth/react";
import LeftSideBar from "../ui/molecules/sidebar/LeftSideBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { setUniversityId } from "../../store/slices/universitySlice";
import Footer from "../ui/molecules/footer";

const dosis = League_Spartan({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

export default function Layout({
  children,
  css,
}: {
  children: React.ReactNode;
  css?: string;
}) {
  const { data } = useSession();
  const dispatch = useDispatch();

  const { data: universityData } = trpc.user.getUserUniversityById.useQuery(
    undefined,
    {
      enabled: !!data?.user?.id,
    },
  );

  useEffect(() => {
    if (data?.user?.id) {
      dispatch(setUniversityId(universityData?.university?.id as string));
    }
  }, [data?.user, dispatch, universityData?.university?.id]);

  return (
    <>
      <Header />
      <main
        className={`${dosis.className} flex min-h-screen w-full flex-col bg-background dark:bg-darkBackground`}
      >
        <LeftSideBar />
        <section className={css}>{children}</section>
        <Footer />
      </main>
    </>
  );
}
