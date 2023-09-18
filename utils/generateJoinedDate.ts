import { format } from "date-fns";

const generateJoinedDate = (created_at: string) => {
  let data = new Date(created_at);

  let formattedDate = format(data, "MMMM d, yyyy");

  return `Joined on ${formattedDate}`;
};

export default generateJoinedDate;
