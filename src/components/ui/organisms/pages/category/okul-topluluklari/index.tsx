import Pagination from "../../../../molecules/pagination";
import { usePagination } from "../../../../../../hooks/usePagination";
import ToplulukCard from "./particles/topluluk-card";
import { trpc } from "../../../../../../utils/trpc";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { Input } from "../../../../atoms/input";

const NUMBER_OF_POSTS_RECEIVED = 6;
const totalPostsLength = 3;

const OkulKulupleri = () => {
  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );

  const pagination = usePagination(NUMBER_OF_POSTS_RECEIVED, totalPostsLength);

  const { data: schoolClubs } = trpc.schoolClub.getAllSchoolClubs.useQuery({
    universityId,
  });

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
        {schoolClubs?.map((schoolClub, i) => (
          <ToplulukCard
            title={schoolClub.name}
            description={schoolClub.description!}
            banner={schoolClub.banner!}
            rating={schoolClub.rating!}
            numberOfMembers={schoolClub._count.users}
            id={schoolClub.id}
            route={schoolClub.slug}
            key={i}
          />
        ))}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};

export default OkulKulupleri;
