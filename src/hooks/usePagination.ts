import { useState } from "react";

export const usePagination = (pageSize: number, totalItemLength: number) => {
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * @constant {number} countPages sayfa sayısını temsil eder, @param totalItemLength ve @param pageSize değerlerinden hesaplanır.
   */
  const countPages = Math.ceil(totalItemLength / pageSize);

  const pagesAsArray = Array(countPages)
    .fill(0)
    .map((_, idx) => idx);

  const isPrevDisabled = currentPage === 0;

  const isNextDisabled = currentPage === isPaginationLongEnough().slice(-1)[0];

  function setPreviousPage() {
    if (isPrevDisabled) return;
    setCurrentPage((prev) => prev - 1);
  }

  function setNextPage() {
    if (isNextDisabled) return;
    setCurrentPage((prev) => prev + 1);
  }

  function setClickedPage(number: number) {
    setCurrentPage(number);
  }

  function isPaginationLongEnough() {
    if (countPages > 6) {
      //Eğer currentPage toplam sayfa sayısının yarısına ulaşmamışsa '...' sağ tarafa -2. index'e,
      //ulaşmışsa sol tarafa 1. index'e ekleniyor.
      if (countPages / 2 >= currentPage) {
        return [
          ...pagesAsArray.slice(
            currentPage === 0 ? currentPage : currentPage - 1, //Buradaki işlem, currentPage değeri 0'dan büyük olduğunda bir önceki elemanı da listeye eklemek.
            currentPage + 3,
          ),
          "...",
          ...pagesAsArray.slice(-1),
        ];
      }
      if (countPages / 2 <= currentPage) {
        return [
          ...pagesAsArray.slice(0, 1),
          "...",
          ...pagesAsArray.slice(currentPage - 1, currentPage + 3),
        ];
      }
    }

    //Eğer yukarıdaki şartlar sağlanmıyorsa olduğu gibi dönüyoruz.
    return pagesAsArray;
  }

  return {
    currentPage,
    setNextPage,
    setPreviousPage,
    isPaginationLongEnough,
    setClickedPage,
    isPrevDisabled,
    isNextDisabled,
  };
};
