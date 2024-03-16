import Image from "next/image";

export const Features = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-1 items-center px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        <div className="overflow-hidden rounded bg-white shadow">
          <div className="p-8">
            <div className="flex items-center">
              <Image
                className="h-auto w-12 flex-shrink-0"
                src="/svg/flame.svg"
                alt=""
                width={48}
                height={48}
              />
              <div className="ml-5 mr-auto">
                <p className="text-xl font-semibold text-[#333]">
                  Özgürce Paylaş
                </p>
                <p className="mt-px text-sm text-gray-600">Lorem Ipsum</p>
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
            <p className="mt-7 text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded bg-white shadow">
          <div className="p-8">
            <div className="flex items-center">
              <Image
                className="h-auto w-12 flex-shrink-0"
                src="/svg/newspaper.svg"
                alt=""
                width={48}
                height={48}
              />
              <div className="ml-5 mr-auto">
                <p className="text-xl font-semibold text-[#333]">
                  Aradığın Not Burada!
                </p>
                <p className="mt-px text-sm text-gray-600">Lorem Ipsum</p>
              </div>
              <svg
                className="block h-6 w-6 text-blue-600"
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
            <p className="mt-7 text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded bg-white shadow">
          <div className="p-8">
            <div className="flex items-center">
              <Image
                className="h-auto w-12 flex-shrink-0"
                src="/svg/att.svg"
                alt=""
                width={48}
                height={48}
              />
              <div className="ml-5 mr-auto">
                <p className="text-xl font-semibold text-[#333]">
                  Hayallerini Keşfet
                </p>
                <p className="mt-px text-sm text-gray-600">Lorem Ipsum</p>
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
            <p className="mt-7 text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded bg-white shadow">
          <div className="p-8">
            <div className="flex items-center">
              <Image
                className="h-auto w-12 flex-shrink-0"
                src="/svg/pen.svg"
                alt=""
                width={48}
                height={48}
              />
              <div className="ml-5 mr-auto">
                <p className="text-xl font-semibold text-[#333]">
                  Evet, Okul Kulüpleri de Var!
                </p>
                <p className="mt-px text-sm text-gray-600">Lorem Ipsum</p>
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
            <p className="mt-7 text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded bg-white shadow">
          <div className="p-8">
            <div className="flex items-center">
              <Image
                className="h-auto w-12 flex-shrink-0"
                src="/svg/event.svg"
                alt=""
                width={48}
                height={48}
              />
              <div className="ml-5 mr-auto">
                <p className="text-xl font-semibold text-[#333]">
                  Etkinliklere Katıl
                </p>
                <p className="mt-px text-sm text-gray-600">Lorem Ipsum</p>
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
            <p className="mt-7 text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded bg-white shadow">
          <div className="p-8">
            <div className="flex items-center">
              <Image
                className="h-auto w-12 flex-shrink-0"
                src="/svg/robot.svg"
                alt=""
                width={48}
                height={48}
              />
              <div className="ml-5 mr-auto">
                <div className="flex items-center space-x-4">
                  <p className="text-xl font-semibold text-[#333]">
                    Ödev Robotu?
                  </p>
                  <div className="rounded-full border-[1px] bg-orange-500 px-2 py-1 font-thin tracking-wider text-white">
                    yakında!
                  </div>
                </div>
                <p className="mt-px text-sm text-gray-600">Lorem Ipsum</p>
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
            <p className="mt-7 text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
