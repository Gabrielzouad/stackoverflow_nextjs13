import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};

export const formatNumberToK = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }

  if (value < 1000000) {
    return (value / 1000).toFixed(1) + 'K';
  }

  return (value / 1000000).toFixed(1) + 'M';
};


export const joinDateWithMonthAndYear = (dateObj: Date): string  => {
  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year: number = dateObj.getFullYear();
  const month: string = months[dateObj.getMonth()];
  const day: number = dateObj.getDate();

  return `${month} ${day}, ${year}`;
}

interface urlQueryParams{
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value}: urlQueryParams) => {
  const currentUrl = qs.parse(params)
  currentUrl[key] = value
  return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true })
}

interface removeUrlQueryParams{
  params: string;
  keysToRemove: string[]
}

export const removeKeysFromQuery = ({ params, keysToRemove }: removeUrlQueryParams) => {
  const currentUrl = qs.parse(params)
  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })
  return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true })
}

interface BadgeParam{
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    BRONZE: 0,
    SILVER: 0,
    GOLD: 0, 
  }
  const { criteria } = params

  criteria.forEach((criterion) => {
    const { type, count } = criterion
    const badgeCriteria: any = BADGE_CRITERIA[type]

   Object.keys(badgeCriteria).forEach((level: any) => {
    if (count >= badgeCriteria[level]) {
      badgeCounts[level as keyof BadgeCounts] += 1
    }
  })
  })
  return badgeCounts
}