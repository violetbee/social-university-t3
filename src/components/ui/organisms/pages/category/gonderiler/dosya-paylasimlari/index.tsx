import { useEffect, useState } from "react";
import { trpc } from "../../../../../../../utils/trpc";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../../store/store";
import { GoFileDirectory } from "react-icons/go";
import Pagination from "../../../../../molecules/pagination";
import { usePagination } from "../../../../../../../hooks/usePagination";
import Link from "next/link";
import { PiCursorClickLight } from "react-icons/pi";
import Image from "next/image";
import { MdOutlineReport } from "react-icons/md";
import Badge from "../../../../../atoms/badge";
import { RxDragHandleDots2 } from "react-icons/rx";

const NUMBER_OF_POSTS_RECEIVED = 9;

const initialPreferences = {
  departmentId: "",
  level: 0,
  classId: "",
};

const DosyaPaylasimlari = () => {
  const [totalPostsLength, setTotalPostsLength] = useState(0);
  const [preferences, setPreferences] = useState(initialPreferences);

  const pagination = usePagination(NUMBER_OF_POSTS_RECEIVED, totalPostsLength);

  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );

  const { data: departments } = trpc.department.getAllDepartments.useQuery({
    universityId,
  });

  const { data: classes } = trpc.department.getClasses.useQuery(
    {
      departmentId: preferences.departmentId,
      level: preferences.level,
    },
    {
      enabled: !!preferences.departmentId && !!preferences.level,
    },
  );

  const {
    data: docTypePosts,
    isSuccess,
    isLoading,
  } = trpc.post.getDocPosts.useQuery({
    universityId,
    departmentId: preferences.departmentId,
    level: preferences.level,
    classId: preferences.classId,
    take: NUMBER_OF_POSTS_RECEIVED,
    skip: NUMBER_OF_POSTS_RECEIVED * pagination.currentPage,
  });

  useEffect(() => {
    if (isSuccess) {
      setTotalPostsLength(4);
    }
  }, [isSuccess]);

  return (
    <div className="grid grid-cols-12 items-start gap-6">
      <div className="col-span-12 divide-y divide-darkHelper overflow-hidden rounded-md border border-darkHelper bg-darkSecondary xl:sticky xl:top-[92px] xl:col-span-2">
        <div className="relative bg-darkPrimary px-3 py-1 pt-2 text-white">
          Araçlar
          <RxDragHandleDots2 className="absolute right-2 top-1/2 -translate-y-1/2 opacity-75" />
        </div>

        <div className="space-y-2 p-3">
          <span className="text-base text-white">Bölüm Filtrele</span>
          <div className="flex flex-wrap gap-2">
            {departments?.map((item) => (
              <button
                onClick={() => {
                  setPreferences({
                    ...initialPreferences,
                    departmentId:
                      preferences.departmentId === item.department.id
                        ? ""
                        : item.department.id,
                  });
                }}
                key={item.department.id}
                className={`shrink-0 items-center justify-center rounded-md ${
                  preferences.departmentId === item.department?.id
                    ? "border-darkPrimary"
                    : "border-transparent"
                } border bg-darkBackground px-2  py-1 text-sm font-light text-white hover:bg-darkPrimary/40`}
              >
                {item.department.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`space-y-2 p-3 ${
            preferences.departmentId ? "blur-0" : "blur-[2px]"
          }`}
        >
          <span className="text-base text-white">Sınıf Filtrele</span>
          <div className="flex gap-2">
            {Array.from(
              {
                length:
                  departments?.find(
                    (item) => item.department.id === preferences.departmentId,
                  )?.department.maxClassLevel || 0,
              },
              (_, i) => i + 1,
            ).map((item) => {
              return (
                <button
                  onClick={() => {
                    setPreferences((prev) => ({
                      ...prev,
                      level: preferences.level === item ? 0 : item,
                      classId: prev.classId && "",
                    }));
                  }}
                  key={item}
                  className={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md ${
                    preferences.level === item
                      ? "border-darkPrimary"
                      : "border-transparent"
                  } border bg-darkBackground px-2  py-1 text-sm font-light text-white hover:bg-darkPrimary/40`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className={`space-y-2 p-3 ${
            preferences.level ? "blur-0" : "blur-[2px]"
          }`}
        >
          <span className="text-base text-white">Ders Filtrele</span>
          <div className="flex flex-wrap gap-2">
            {classes?.map((item) => (
              <div
                key={item.id}
                className={`flex shrink-0 cursor-pointer items-center justify-center rounded-md ${
                  preferences.classId === item.id
                    ? "border-darkPrimary"
                    : "border-transparent"
                } border bg-darkBackground px-2 py-1 text-sm font-light text-white hover:bg-darkPrimary/40`}
                onClick={() => {
                  setPreferences((prev) => ({
                    ...prev,
                    classId: prev.classId === item.id ? "" : item.id,
                  }));
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative col-span-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-12 lg:grid-cols-3 xl:col-span-10 xl:ml-5 ">
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 flex h-20 w-full -translate-x-1/2 translate-y-1/2 animate-pulse items-center justify-center">
            Yükleniyor...
          </div>
        )}
        {docTypePosts?.map((item, idx) => (
          <div
            className={`flex flex-col ${
              isLoading ? "blur-md" : ""
            } relative justify-between gap-1 rounded-md border border-darkHelper bg-darkSecondary p-4 pt-5 text-lg/6 text-white`}
            key={idx}
          >
            <div className="flex">
              <span className="flex gap-2 rounded-md text-sm">
                <Image
                  src={item.user.image || "/images/avatar-male.svg"}
                  className="h-8 w-auto rounded-full object-cover"
                  alt={item.user.name || "default profile image"}
                  width={64}
                  height={64}
                />
                <button className="mt-1 flex flex-col items-start text-sm/4">
                  <span>{`@${item.user?.name}`}</span>
                  <span className="text-xs font-extralight text-whitish/60">
                    {item.user?.department?.name} ({item.user?.grade}. Sınıf)
                  </span>
                </button>
              </span>
              <div className="ml-auto">
                <button className="text-xs font-extralight tracking-tight text-darkHelper dark:text-whitish/50">
                  <MdOutlineReport className="text-xl hover:text-red-500" />
                </button>
              </div>
            </div>
            <div className="my-2 h-[1px] bg-darkHelper/50"></div>
            <h3>{item.title}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                title={item.class?.name}
                className=" bg-rose-700/30 hover:bg-rose-700/60"
                fn={() => {
                  setPreferences((prev) => ({
                    ...prev,
                    departmentId: item.department?.id as string,
                    level: item.class?.level as number,
                    classId: item.class?.id as string,
                  }));
                }}
              />
              <Badge
                title={item.department?.name}
                className="bg-darkPrimary/40 hover:bg-darkPrimary/70"
                fn={() => {
                  setPreferences({
                    ...initialPreferences,
                    departmentId: item.department?.id as string,
                  });
                }}
              />
              <Badge
                title={item.class?.level + ". Sınıf"}
                className="bg-lime-700/70 hover:bg-lime-700"
                fn={() => {
                  setPreferences((prev) => ({
                    ...prev,
                    departmentId: item.department?.id as string,
                    level: item.class?.level as number,
                  }));
                }}
              />
            </div>
            <p className="mt-4 h-10 truncate text-sm text-whitish/70">
              {item.content}
            </p>
            {item.files && item.files.length > 0 && (
              <>
                <div className="mt-3 flex items-center gap-2">
                  <GoFileDirectory className="text-2xl" />
                  <span className="mt-[3px] text-sm">
                    {item._count.files} Dosya
                  </span>
                </div>
                <div
                  className={`relative mt-1 grid h-16 grid-cols-3 gap-2 ${
                    item.files.length > 3
                      ? "overflow-hidden after:absolute after:bottom-0 after:right-0 after:h-9 after:w-full after:bg-gradient-to-t after:from-darkSecondary after:via-darkSecondary/50 after:to-transparent after:content-['']"
                      : ""
                  }`}
                >
                  {item.files.map((file) => (
                    <div
                      className="flex flex-col items-center justify-center rounded-md bg-darkBackground px-3 py-2 text-center"
                      key={file.id}
                    >
                      <span className="text-sm">
                        {file.name.length > 8
                          ? file.name.slice(0, 8) + "..."
                          : file.name}
                      </span>
                      <span className="text-xs text-whitish/30">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <Link
              href={`dosya-paylasimlari/${item.slug}`}
              className="group mt-5 flex items-center justify-center gap-1 rounded-md border border-darkHelper bg-darkBackground py-2 text-center text-white duration-150 hover:border-darkPrimary hover:bg-white hover:text-darkBackground"
            >
              <span className="mt-1">Detaylı Görüntüle</span>
              <PiCursorClickLight className="text-darkPrimary group-hover:text-darkBackground" />
            </Link>
          </div>
        ))}
        {docTypePosts && docTypePosts.length === 0 && (
          <div className="col-span-12 flex h-40 items-center justify-center text-whitish/50">
            Bu kategoride henüz bir paylaşım yapılmamıştır.
          </div>
        )}
      </div>
      {docTypePosts && docTypePosts.length > 0 && (
        <div className="col-span-12 mt-8 justify-self-center">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
};

export default DosyaPaylasimlari;
