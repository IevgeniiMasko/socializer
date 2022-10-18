import { parseISO, formatDistanceToNow } from "date-fns";

export const timeAgo = (timestamp) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return timeAgo;
};
