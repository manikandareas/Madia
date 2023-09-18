import {
  format,
  formatDistanceToNow,
  formatDistance,
  intlFormatDistance,
} from "date-fns";

export const timeFormater = (timestamp: string) => {
  const date = new Date(timestamp);

  const formattedDate = format(date, "MMMM d");
  const timeAgo = intlFormatDistance(date, new Date(), { locale: "id" });

  return `${formattedDate} ( ${timeAgo} )`;
};
