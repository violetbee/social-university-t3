import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { GoFileDirectory } from "react-icons/go";
import Pagination from "../pagination";

const OrnekDosyaPaylasimlari = [
  {
    id: 0,
    name: "Most Common Algorithms",
    description: "I want to share my notes about most common algorithms",
    className: "Algorithm Analysis and Design",
    classLevel: 2,
    files: [
      {
        id: 0,
        name: "Tree Data Structure",
        size: "1.2 MB",
      },
      {
        id: 1,
        name: "Most Common Algorithms",
        size: "0.8 MB",
      },
      {
        id: 2,
        name: "Sorting Algorithms",
        size: "1.5 MB",
      },
    ],
  },
  {
    id: 1,
    name: "Computer Science Notes",
    description: "First file is about introduction to computer science",
    className: "Introduction to Computer Science",
    classLevel: 1,
    files: [
      {
        id: 0,
        name: "History of Computer Science",
        size: "1.2 MB",
      },
      {
        id: 1,
        name: "Computer Science Notes",
        size: "0.8 MB",
      },
      {
        id: 2,
        name: "Globalization of Computer Science",
        size: "1.5 MB",
      },
    ],
  },
  {
    id: 2,
    name: "Java Notes",
    description: "Java notes for beginners",
    className: "Java Programming",
    classLevel: 4,
    files: [
      {
        id: 0,
        name: "Java Notes",
        size: "1.2 MB",
      },
      {
        id: 1,
        name: "Java Notes",
        size: "0.8 MB",
      },
      {
        id: 2,
        name: "Java Notes",
        size: "5 MB",
      },
      {
        id: 3,
        name: "Java Notes",
        size: "2 MB",
      },
      {
        id: 4,
        name: "Java Notes",
        size: "1.5 MB",
      },
      {
        id: 5,
        name: "Java Notes",
        size: "1.5 MB",
      },
    ],
  },
];

const DosyaPaylasimlari = () => {
  const [preferences, setPreferences] = useState({
    departmentId: "",
    level: 0,
    classId: "",
  });

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
  return (
    <div className="grid grid-cols-12 items-start gap-6">
      <div className="col-span-12 flex flex-col divide-y divide-darkHelper rounded-md border border-darkHelper bg-darkSecondary lg:col-span-2">
        <div className="space-y-2 p-3">
          <span className="text-base text-white">Bölüm Filtrele</span>
          <div className="flex flex-wrap gap-2">
            {departments?.map((item) => (
              <button
                onClick={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    departmentId: item.department.id,
                  }))
                }
                key={item.department.id}
                className="shrink-0 cursor-pointer items-center justify-center rounded-md bg-darkBackground px-2 py-1 text-sm font-light text-white hover:bg-darkPrimary hover:text-darkSecondary"
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
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      level: item,
                    }))
                  }
                  key={item}
                  className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md bg-darkBackground text-sm font-light text-white hover:bg-darkPrimary hover:text-darkSecondary"
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
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-md bg-darkBackground px-2 py-1 text-sm font-light text-white hover:bg-darkPrimary hover:text-darkSecondary"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-10 lg:grid-cols-3 3xl:grid-cols-4">
        {OrnekDosyaPaylasimlari.map((item, idx) => (
          <div
            className="flex flex-col gap-1 rounded-md border border-darkHelper bg-darkSecondary p-4 text-lg/6 text-white"
            key={idx}
          >
            <h3>{item.name}</h3>
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-white px-2 pt-[2px] text-sm tracking-tight text-darkHelper">
                {item.className}
              </span>
              <span className="rounded-xl bg-darkBackground px-2 pt-[2px] text-sm tracking-tight text-white">
                {item.classLevel}. Sınıf
              </span>
            </div>
            <p className="mt-4 h-10 text-sm text-whitish/70">
              {item.description}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <GoFileDirectory className="text-2xl" />
              <span className="mt-[3px] text-sm">
                {item.files.length} Dosya
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
                  className="flex flex-col items-center rounded-md bg-darkBackground px-3 py-2 text-center"
                  key={file.id}
                >
                  <span className="text-sm">
                    {file.name.length > 11
                      ? file.name.slice(0, 11) + "..."
                      : file.name}
                  </span>
                  <span className="text-xs text-whitish/30">{file.size}</span>
                </div>
              ))}
            </div>
            <button className="mt-5 rounded-md border border-darkHelper bg-darkBackground p-2 px-4 text-white duration-150 hover:bg-white hover:text-darkBackground">
              Detaylı Görüntüle
            </button>
          </div>
        ))}
      </div>
      <div className="col-span-12 mt-8 justify-self-center">
        <Pagination pageSize={2} totalItemLength={16} />
      </div>
    </div>
  );
};

export default DosyaPaylasimlari;
