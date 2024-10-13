import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { IMAGE_THUMBNAIL_URL, IMAGE_URL } from "@/app/constant/constant";

export function cn(...inputs: any) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(type: "image" | "thumbnail", path: string) {
  if (type === "image") return `${IMAGE_URL}${path}`;
  return `${IMAGE_THUMBNAIL_URL}${path}`;
}