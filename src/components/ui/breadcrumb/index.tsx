import Link from "next/link";

function BreadCrumb({
  category,
  subCategory,
  name,
  title,
}: {
  category: string;
  subCategory?: string;
  name: string;
  title: string;
}) {
  function handleCategoryName(category: string) {
    switch (category) {
      case "gonderiler":
        return "Gönderiler";
      case "dosya-paylasimlari":
        return "Dosya Paylaşımları";
      case "soru-cevap-paylasimlari":
        return "Soru-Cevap Paylaşımları";
      case "anketler":
        return "Anketler";
      case "etkinlikler":
        return "Etkinlikler";
      default:
        return "Gönderiler";
    }
  }

  return (
    <div className="mb-4 flex items-center gap-2 text-sm/4 text-darkSecondary dark:text-white">
      <div className="flex items-center gap-2">
        <Link href="/">Anasayfa</Link>
        <span>/</span>
        <Link href={`/${category}`}>{handleCategoryName(category)}</Link>
        <span>/</span>
        {subCategory && subCategory.length > 0 ? (
          <Link href={`/${category}?sub=${subCategory}`}>{name}</Link>
        ) : (
          <span className="text-[#333] dark:text-[#777]">{name}</span>
        )}
        <span>/</span>
        <span className="text-[#333] dark:text-[#777]">{title}</span>
      </div>
    </div>
  );
}

export default BreadCrumb;
