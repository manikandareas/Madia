import {
  format,
  formatDistanceToNow,
  formatDistance,
  intlFormatDistance,
} from "date-fns";

const timeFormatter = (timestamp: string) => {
  const date = new Date(timestamp);

  const formattedDate = format(date, "MMMM d");
  const timeAgo = intlFormatDistance(date, new Date(), { locale: "id" });

  return `${formattedDate} ( ${timeAgo} )`;
};

export default timeFormatter;
