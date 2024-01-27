import { Input } from "../../../ui/input";
import Pagination from "../../../ui/pagination";
import { usePagination } from "../../../../hooks/usePagination";
import ToplulukCard from "./particles/topluluk-card";
import { trpc } from "../../../../utils/trpc";

const NUMBER_OF_POSTS_RECEIVED = 6;
const totalPostsLength = 3;

const OkulKulupleri = () => {
  const pagination = usePagination(NUMBER_OF_POSTS_RECEIVED, totalPostsLength);

  // const {data:schoolClubs} = trpc.

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <div className="flex w-full gap-8 rounded-md bg-darkSecondary px-4 py-2">
        <Input.Select
          label="Topluluk Türü"
          name="select-club"
          options={[
            { id: "1", name: "Deneme" },
            { id: "2", name: "Yeni" },
          ]}
          disabled={false}
        />
        <Input.Select
          label="Sıralama"
          name="sort"
          options={[
            { id: "1", name: "Deneme" },
            { id: "2", name: "Yeni" },
          ]}
          disabled={false}
        />
        <Input
          label="Arama"
          name="search"
          type="text"
          placeholder="Arama yapın"
          disabled={false}
        />
      </div>

      <div className="grid w-full flex-1 grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <ToplulukCard
          title="Sosyal Yardım ve Dayanışma Kulübü"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quos, quibusdam, itaque, doloribus voluptatum quae voluptatem
            voluptas ipsa quod quia voluptatibus. Quisquam quos, quibusdam,
            itaque, doloribus voluptatum quae voluptatem voluptas ipsa quod
            quia voluptatibus."
          banner="https://youth.europa.eu/d8/sites/default/files/styles/1200x600/public/2022-01/Jint-47.jpg"
          rating={3}
          numberOfMembers={784}
          id="1"
          route="sosyal-yardimlasma"
        />

        <ToplulukCard
          title="Çılgın Yazılımcılar Kulübü"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quos, quibusdam, itaque, doloribus voluptatum quae voluptatem
            voluptas ipsa quod quia voluptatibus. Quisquam quos, quibusdam,
            itaque, doloribus voluptatum quae voluptatem voluptas ipsa quod
            quia voluptatibus."
          banner="https://didmdw8v48h5q.cloudfront.net/wp-content/uploads/2023/06/Background-1-1024x512.png"
          rating={3.8}
          numberOfMembers={525}
          id="1"
          route="cilgin-yazilimcilar"
        />

        <ToplulukCard
          title="İğneden Korkan Hemşireler Kulübü"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quos, quibusdam, itaque, doloribus voluptatum quae voluptatem
            voluptas ipsa quod quia voluptatibus. Quisquam quos, quibusdam,
            itaque, doloribus voluptatum quae voluptatem voluptas ipsa quod
            quia voluptatibus."
          banner="https://www.wgtn.ac.nz/__data/assets/image/0008/2147471/varieties/ls_medium.jpg"
          rating={5}
          numberOfMembers={329}
          id="1"
          route="igneden-korkan-hemsireler"
        />
      </div>
      <Pagination {...pagination} />
    </div>
  );
};

export default OkulKulupleri;
