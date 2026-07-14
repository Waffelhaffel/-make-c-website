"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";

import { CustomCursor } from "@/components/ui/CustomCursor";
import { Grain } from "@/components/ui/Grain";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export function SiteEffects({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    if (isStudio) return;
    document.body.classList.add("cursor-none");
    return () => document.body.classList.remove("cursor-none");
  }, [isStudio]);

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Grain />
        <CustomCursor />
        {children}
      </SmoothScroll>
    </MotionConfig>
  );
}
