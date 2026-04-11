"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import LineOverlay from "@/components/LineOverlay";

function ShellInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEmbed = searchParams.get("embed") === "true";
  const hideHeader = pathname === "/contents";

  if (isEmbed) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <LineOverlay />
      {!hideHeader && <Header />}
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
    </>
  );
}

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<main className="flex-1 pb-16">{children}</main>}>
      <ShellInner>{children}</ShellInner>
    </Suspense>
  );
}
