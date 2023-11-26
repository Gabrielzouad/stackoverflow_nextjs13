import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
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