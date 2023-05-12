/*
  @param date: Date - Date object to calculate time ago
  @return string
*/

export const publishedTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " yıl önce";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " ay önce";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " gün önce";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " saat önce";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " dakika önce";
  }
  return Math.floor(seconds) + " saniye önce";
};

export const slugify = function (text: string) {
  const trMap = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  };
  for (const key in trMap) {
    text = text.replace(
      new RegExp("[" + key + "]", "g"),
      trMap[key as keyof typeof trMap]
    );
  }
  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, "") // remove non-alphanumeric chars
    .replace(/\s/gi, "-") // convert spaces to dashes
    .replace(/[-]+/gi, "-") // trim repeated dashes
    .toLowerCase();
};
