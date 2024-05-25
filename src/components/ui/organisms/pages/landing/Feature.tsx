import Image from "next/image";

const features = [
  {
    id: 0,
    title: "Özgürce Paylaş",
    subTitle: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    icon: "/svg/flame.svg",
    isActive: true,
  },
  {
    id: 1,
    title: "Aradığın Not Burada!",
    subTitle: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    icon: "/svg/newspaper.svg",
    isActive: true,
  },
  {
    id: 2,
    title: "Hayallerini Keşfet",
    subTitle: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    icon: "/svg/att.svg",
    isActive: true,
  },
  {
    id: 3,
    title: "Evet, Okul Kulüpleri de Var!",
    subTitle: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    icon: "/svg/pen.svg",
    isActive: true,
  },
  {
    id: 4,
    title: "Etkinliklere Katıl",
    subTitle: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    icon: "/svg/event.svg",
    isActive: true,
  },
  {
    id: 5,
    title: "Ödev Robotu?",
    subTitle: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
    icon: "/svg/robot.svg",
    isActive: false,
  },
];

export const Features = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-1 items-center px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="overflow-hidden rounded bg-white shadow dark:border dark:border-darkHelper dark:bg-darkSecondary"
          >
            <div className="p-8">
              <div className="flex items-center">
                <Image
                  className="h-auto w-12 flex-shrink-0"
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                />
                <div className="ml-5 mr-auto">
                  <div className="flex items-center space-x-4">
                    <p className="text-xl font-semibold text-[#333] dark:text-whitish">
                      {feature.title}
                    </p>
                    {!feature.isActive && (
                      <div className="rounded-full border-[1px] bg-orange-500 px-2 py-1 font-thin tracking-wider text-white">
                        yakında!
                      </div>
                    )}
                  </div>
                  <p className="mt-px text-sm text-gray-500">
                    {feature.subTitle}
                  </p>
                </div>
                <svg
                  className="hidden h-5 w-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <p className="mt-7 text-base leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
