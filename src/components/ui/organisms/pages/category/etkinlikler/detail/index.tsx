import Image from "next/image";
import type { EventDetails } from "../../../../../../../server/api/event/GET/event-detail";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { useState } from "react";
import { TbTimelineEvent } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPeopleGroup, FaTurkishLiraSign } from "react-icons/fa6";
import { BiHeart } from "react-icons/bi";
import BreadCrumb from "../../../../../atoms/breadcrumb";
import { MultiEvent } from "../../../../../molecules/cards/Event";

type Props = {
  event: EventDetails;
  category: string;
};

enum ForWho {
  ALL = "Herkese Açık",
  CLASS_MEMBER = "Derse Kayıtlı Öğrencilere Açık",
  DEPARTMENT_MEMBER = "Bölüm Öğrencilerine Açık",
  UNIVERSITY_MEMBER = "Üniversite Öğrencilerine Açık",
  SCHOOL_CLUB_MEMBER = "Kulüp Üyelerine Açık",
}

function EtkinliklerInPage({ event, category }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const handleMouseEnter = (item: number) => {
    setHoverIndex(item);
  };

  const handleMouseLeave = () => {
    setHoverIndex(0);
  };

  console.log(event);

  return (
    <>
      <BreadCrumb
        category={category as string}
        name={event.eventType.name}
        subCategory={event.eventType.slug!}
        title={event.title}
      />
      <div className="flex w-full items-start gap-4">
        <Image
          alt="image"
          src={event.image!}
          width={500}
          height={100}
          className="sticky top-[92px] w-96 rounded-md border border-darkHelper object-cover object-center"
        />
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex w-full flex-col rounded-md border border-darkHelper bg-darkSecondary px-5 py-7">
            <div className="flex justify-between pl-4">
              <h1 className="text-3xl font-semibold">{event.title}</h1>
              <div className="flex items-center gap-4">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
                  <div key={item} className="relative">
                    <PiHandsClappingDuotone
                      className={`${
                        item > hoverIndex ? "text-white" : "text-darkPrimary"
                      }  peer/rate cursor-pointer transition-colors duration-200 ease-in-out`}
                      size={28}
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div className="absolute -bottom-10 left-0 flex h-7 w-7 select-none items-center justify-center rounded-full bg-darkPrimary pr-[1px] pt-[1px] text-white opacity-0 transition-all duration-200 ease-in-out after:absolute after:-top-[2px] after:h-2 after:w-2 after:rotate-45 after:rounded-[1px] after:bg-darkPrimary peer-hover/rate:opacity-100">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* event kategori düğmeleri */}
            <div className="mt-1 flex flex-wrap gap-2 pl-4">
              <div className="flex items-center justify-center gap-2 rounded-full border border-darkPrimary bg-darkPrimary/40 px-3 py-[1px] text-white">
                <TbTimelineEvent />
                <span className="pt-1">{event.eventType.name}</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-full border border-fuchsia-600 bg-fuchsia-600/40 px-3 py-[1px] text-white">
                <IoLocationSharp />
                <span className="pt-1">{event.location}</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-full border border-green-700 bg-green-700/40 px-3 py-[1px] text-white">
                <FaTurkishLiraSign />
                <span className="pt-1">
                  {event.price ? event.price : "Ücretsiz"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-full border border-yellow-300 bg-yellow-300/40 px-3 py-[1px] text-white">
                <FaPeopleGroup />
                <span className="pt-1">
                  {ForWho[event.forWho as keyof typeof ForWho]}
                </span>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-darkBackground p-4">
              <p className="text-lg font-light text-whitish/80">
                {event.description}
              </p>
            </div>
            <div className="mt-5 flex items-center pl-4 text-whitish/90">
              <div className="flex items-center divide-x divide-darkBackground [&>*:nth-child(1)]:pl-0">
                <button className="px-4">Kurallar</button>
                <div className="px-4">Talep Edilen: 20</div>
                <div className="px-4">Kalan Talep Hakkı: 55</div>
              </div>
              <button className="ml-auto rounded-lg border border-darkHelper bg-darkBackground p-2 px-3 text-lg text-white duration-200 hover:bg-white hover:text-darkBackground">
                Favorilerime Ekle
                <BiHeart className="mb-1 ml-2 inline-block" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="relative col-span-8 flex w-full items-center rounded-md border border-darkHelper bg-darkSecondary">
              <button className="absolute bottom-0 right-0 rounded-br-md rounded-tl-3xl bg-darkPrimary/60 px-4 py-2 text-white duration-200 hover:bg-darkPrimary/80">
                Talep Oluştur
              </button>
              <div className="py-7 pl-9">
                <FaCalendarAlt size={48} />
              </div>
              <div className="pl-4 pt-1">
                <div className="flex gap-2">
                  <span className="text-lg font-semibold">Başlangıç:</span>
                  <span className="text-lg text-whitish">
                    {new Date(event.startDate).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-lg">
                    -{" "}
                    {new Date(event.startDate)
                      .toISOString()
                      .split("T")[1]
                      ?.slice(0, 5)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg font-semibold">Bitiş:</span>
                  <span className="text-lg text-whitish">
                    {new Date(event.endDate).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex w-full flex-col gap-2 rounded-md border border-darkHelper bg-darkSecondary p-4">
              {/* etkinliği oluşturan kişi hakkında bilgiler */}
              <h1 className="text-xl font-semibold">Etkinliği Oluşturan</h1>
              <div className="flex items-center gap-4">
                <Image
                  alt="image"
                  src={event.user.image!}
                  width={40}
                  height={40}
                  className="rounded-full border border-darkHelper object-cover object-center"
                />
                <div className="flex flex-col">
                  <h1 className="text-base font-medium">
                    {event.user.name} {event.user.surname}
                  </h1>
                  <span className="text-base font-light text-whitish/80">
                    Yazılım Mühendisliği - 4. Sınıf
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-darkHelper bg-darkSecondary px-9 py-4">
            <div className="mb-4 flex items-end gap-2">
              <span className="text-4xl text-darkPrimary">{20}</span>
              <h1 className="pb-1 text-xl font-semibold">
                Kişi Katılmak İçin Talepte Bulundu
              </h1>
              <button className="ml-auto rounded-lg border border-darkHelper bg-darkBackground p-2 px-3 text-lg text-white duration-200 hover:bg-white hover:text-darkBackground">
                Tümünü Gör
              </button>
            </div>
            <div className="relative mt-8 grid grid-cols-3 gap-2">
              {[
                {
                  id: 0,
                  image: event.user.image,
                  name: "Çağlar",
                  surname: "Karahüseyin",
                },
                {
                  id: 1,
                  image: event.user.image,
                  name: "Çağlar",
                  surname: "Karahüseyin",
                },
                {
                  id: 2,
                  image: event.user.image,
                  name: "Çağlar",
                  surname: "Karahüseyin",
                },
                {
                  id: 3,
                  image: event.user.image,
                  name: "Çağlar",
                  surname: "Karahüseyin",
                },
                {
                  id: 4,
                  image: event.user.image,
                  name: "Çağlar",
                  surname: "Karahüseyin",
                },
                {
                  id: 5,
                  image: event.user.image,
                  name: "Çağlar",
                  surname: "Karahüseyin",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex select-none items-center gap-2 rounded-md border border-darkHelper px-4 py-2 blur-md"
                >
                  <Image
                    alt="image"
                    src={item.image!}
                    width={40}
                    height={40}
                    className="rounded-full border border-darkHelper object-cover object-center"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-base font-medium">
                      {item.name} {item.surname}
                    </h1>
                    <span className="text-base font-light text-whitish/80">
                      Yazılım Mühendisliği - 4. Sınıf
                    </span>
                  </div>
                </div>
              ))}
              <button className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-darkBackground pt-[5px] align-middle text-4xl/9 font-medium text-white">
                Katılımcıları Görmek İçin Premium Üye Olun
              </button>
            </div>
          </div>
          <div className="rounded-md border border-darkHelper bg-darkSecondary px-9 py-4">
            {/* Kullanıcının oluşturduğu diğer etkinlikler */}
            <div className="mb-4 flex items-end gap-2">
              <h1 className="pb-1 text-xl font-semibold">
                İlginizi Çekebilecek Diğer Etkinlikler
              </h1>
              <button className="ml-auto rounded-lg border border-darkHelper bg-darkBackground p-2 px-3 text-lg text-white duration-200 hover:bg-white hover:text-darkBackground">
                Tümünü Gör
              </button>
            </div>
            <MultiEvent columnCount={3} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EtkinliklerInPage;
