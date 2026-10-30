import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

// The home greeting uses the large size; inner pages use the default.
export function PageTitle({
  children,
  large = false,
}: {
  children: ReactNode;
  large?: boolean;
}) {
  return (
    <Reveal>
      <h1
        className={`leading-[1.05] font-semibold tracking-tight ${
          large ? "text-4xl sm:text-5xl md:text-6xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {children}
      </h1>
    </Reveal>
  );
}
