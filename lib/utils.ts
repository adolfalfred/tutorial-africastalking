import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function convertISOToReadable(
  isoDateString: string | Date,
  timeDifference: number = 0
) {
  const date = new Date(isoDateString);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate().toString().padStart(2, "0");
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours() + timeDifference;
  const hours = hour.toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${dayOfWeek}, ${dayOfMonth}${getOrdinal(
    date.getDate()
  )} ${month} ${year} ${hours}:${minutes}`;
}

function getOrdinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ReportOptions = [
  "Daily",
  "Weekly",
  "2 Weeks",
  "Monthly",
  "2 Months",
  "3 Months",
  "4 Months",
  "6 Months",
  "8 Months",
  "9 Months",
  "12 Months",
];

export function calculateAge(birthDate: string) {
  var birthDateObj: Date = new Date(birthDate);
  var currentDate: Date = new Date();
  var timeDifference: number = currentDate.getTime() - birthDateObj.getTime();
  const age: number = timeDifference / (1000 * 60 * 60 * 24 * 365.25);
  if (age > 1) return Math.floor(age);
  if (age > 0.5) return age.toFixed(1);
  return age.toFixed(2);
}
