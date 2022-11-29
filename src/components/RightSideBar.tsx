import { cookies } from "next/headers";

import { FC } from "react";

const RightSideBar: FC = () => {
  return (
    <div className="flex w-40 flex-col gap-6 lg:w-60">
      <div className="w-full space-y-2 rounded-md bg-white p-4 shadow-sm">
        <h1 className="text-xl text-slate-900/70">Popüler Yazılar</h1>
        <ul className="divide-y rounded-lg border-[1px] text-stone-700">
          <li className="space-y-2 py-1 px-2">
            <h1 className="text-lg font-semibold">Merhaba Dünya</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              ipsum delectus labore voluptatum quis unde sint voluptate nisi,
              reprehenderit impedit!
            </p>
            <p className="text-end">- Çağlar Karahüseyin</p>
          </li>
          <li className="space-y-2 py-1 px-2">
            <h1 className="text-lg font-semibold">Merhaba Dünya</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              ipsum delectus labore voluptatum quis unde sint voluptate nisi,
              reprehenderit impedit!
            </p>
            <p className="text-end">- Çağlar Karahüseyin</p>
          </li>
          <li className="space-y-2 py-1 px-2">
            <h1 className="text-lg font-semibold">Merhaba Dünya</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              ipsum delectus labore voluptatum quis unde sint voluptate nisi,
              reprehenderit impedit!
            </p>
            <p className="text-end">- Çağlar Karahüseyin</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;
