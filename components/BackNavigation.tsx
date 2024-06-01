"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function BackNavigation({
  children,
  className,
}: {
  children: ReactNode | string;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={cn("bg-gray-400 dark:bg-gray-900", className)}
    >
      {children}
    </Button>
  );
}
