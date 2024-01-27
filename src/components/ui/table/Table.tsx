import Image from "next/image";

const schoolClubs = [
  {
    id: 0,
    name: "Yazılım Mühendisliği Kulübü",
    manager: "Ahmet Yılmaz",
    memberCount: 104,
    application: true,
  },
  {
    id: 2,
    name: "Rekabetçi Programlama Kulübü",
    manager: "Şükrü Kırdemir",
    memberCount: 85,
    application: true,
  },
  {
    id: 3,
    name: "Kimya Mühendisleri Kulübü",
    manager: "Nazlı Durmazbilek",
    memberCount: 148,
    application: false,
  },
  {
    id: 4,
    name: "Çevrimiçi Oyunlar Kulübü",
    manager: "Çağlar Karahüseyin",
    memberCount: 255,
    application: true,
  },
  {
    id: 5,
    name: "Oyun Geliştirme Kulübü",
    manager: "Burak Karademir",
    memberCount: 388,
    application: false,
  },
];

export default function Table() {
  return (
    <div className="mt-2 grid overflow-hidden">
      <div className="overflow-hidden rounded-lg border border-darkHelper shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-darkHelper">
          <thead className="bg-darkSecondary">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              >
                Logo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              >
                Kulüp Adı
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              >
                Kulüp Yöneticisi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              >
                Üye Sayısı
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              >
                Başvuru
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white text-center dark:divide-darkHelper dark:bg-darkBackground">
            {schoolClubs.map((club) => (
              <tr key={club.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {club.id + 1}
                  </div>
                </td>
                <td className="flex justify-center whitespace-nowrap px-6 py-4">
                  <div className="h-12 w-12">
                    <Image
                      src="/images/noLogo.png"
                      className="h-full w-full object-cover grayscale"
                      alt="logo"
                      width={48}
                      height={48}
                    />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {club.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {club.manager}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {club.memberCount}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  <button
                    className={`w-20 rounded py-2 font-bold text-darkSecondary duration-150 ${
                      club.application
                        ? "bg-darkPrimary hover:hue-rotate-15"
                        : "bg-darkHelper text-white"
                    }`}
                  >
                    {club.application ? "Başvur" : "Kapalı"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-darkSecondary">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              ></th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              ></th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              ></th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              ></th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              ></th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
              ></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
