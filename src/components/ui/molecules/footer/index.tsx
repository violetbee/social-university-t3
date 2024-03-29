import Link from "next/link";

export default function Footer() {
  return (
    <div className="border-t border-t-darkHelper">
      <div className="mx-auto flex max-w-[1700px] flex-col justify-between gap-6 p-5 md:flex-row lg:px-16 lg:py-8">
        <div className="w-full md:w-1/3">
          <Link
            href={"/"}
            className="cursor-pointer pt-2 text-3xl/10 tracking-tighter text-darkSecondary dark:text-white"
          >
            SOSYAL<span className="font-bold">ÜNİVERSİTE</span>
          </Link>
          <p className="mt-3 text-xs text-whitish/60">
            Sosyal Üniversite, üniversite ve üniversite adayları için
            geliştirilmiş bir sosyal medya platformudur. Bu platformda
            üniversite hayatını kolaylaştıracak birçok özellik ve bu
            özelliklerin yanında birçok eğlenceli aktivite bulunmaktadır.
          </p>
        </div>
        <div className="flex w-full justify-center gap-8 text-center md:w-1/3 md:gap-16">
          <div>
            <h3 className="text-xl font-semibold">Keşfet</h3>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              <span className="text-whitish/60">Araçlar</span>
              <span className="text-whitish/60">Başvurular</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Hızlı Erişim</h3>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              <span className="text-whitish/60">Üniversiteler</span>
              <span className="text-whitish/60">Bölümler</span>
              <span className="text-whitish/60">Topluluklar</span>
              <span className="text-whitish/60">Etkinlikler</span>
              <span className="text-whitish/60">İlanlar</span>
              <span className="text-whitish/60">Anketler</span>
              <span className="text-whitish/60">Soru Çözümleri</span>
              <span className="text-whitish/60">Üniversite Yorumları</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Platform</h3>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              <span className="text-whitish/60">Anasayfa</span>
              <span className="text-whitish/60">Hakkımızda</span>
              <span className="text-whitish/60">SSS</span>
              <span className="text-whitish/60">Şikayet</span>
              <span className="text-whitish/60">Kullanım Şartları</span>
              <span className="text-whitish/60">Aydınlatma Metni</span>
              <span className="text-whitish/60">İletişim</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/5">
          <h3 className="text-xl font-semibold">İletişim</h3>
          <div className="mt-3 flex flex-col gap-2 text-xs">
            <span className="text-whitish/60">
              <span className="text-green-400">Sosyal Üniversite</span> ile
              ilgili her türlü soru, görüş ve önerilerinizi bize
              iletebilirsiniz.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
