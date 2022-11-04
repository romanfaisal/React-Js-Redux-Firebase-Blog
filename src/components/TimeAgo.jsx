import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp} className="post-time">
      <i class="fa fa-clock-o" aria-hidden="true"></i>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
export default TimeAgo;
