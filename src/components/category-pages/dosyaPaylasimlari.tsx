import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

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
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-2 flex flex-col divide-y divide-darkHelper rounded-md border border-darkHelper bg-darkSecondary">
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
      <div className="col-span-10 flex items-center justify-center bg-black text-2xl font-medium text-white">
        BU ALANDA DOSYA PAYLAŞIMLARI GÖSTERİLECEK
      </div>
    </div>
  );
};

export default DosyaPaylasimlari;
