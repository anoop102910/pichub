import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns"

interface TimestampProps {
  date: string;
  className?: string;
}

const Timestamp = ({ date, className }: TimestampProps) => {
  const timeAgo = formatDistanceToNow(parseISO(date), { addSuffix: true });
  return <span className={className}>{timeAgo}</span>;
};

export default Timestamp;
