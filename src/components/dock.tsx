"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { Briefcase, FileText, Folder, Mail, UserRound, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";

type Item = {
  href: string;
  label: string;
  icon: LucideIcon;
  // Opens in a new tab instead of client-side navigation
  external?: boolean;
};

const items: Item[] = [
  { href: "/", label: "About", icon: UserRound },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/experiences", label: "Experience", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: profile.resume, label: "Resume", icon: FileText, external: true },
];

export function Dock() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      aria-label="Main"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
      className="fixed inset-x-0 top-5 z-50 flex justify-center px-4"
    >
      <ul
        onPointerMove={(e) =>
          e.pointerType === "mouse" && mouseX.set(e.clientX)
        }
        onPointerLeave={() => mouseX.set(Infinity)}
        className="flex items-center gap-1 rounded-xl border border-white/5 bg-surface/80 p-1.5 shadow-lg shadow-black/30 backdrop-blur-md"
      >
        {items.map((item) => (
          <DockItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            mouseX={mouseX}
          />
        ))}
      </ul>
    </motion.nav>
  );
}

function DockItem({
  href,
  label,
  icon: Icon,
  external,
  active,
  mouseX,
}: Item & { active: boolean; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    return rect ? x - rect.left - rect.width / 2 : Infinity;
  });
  const size = useSpring(
    useTransform(distance, [-120, 0, 120], [40, reduce ? 40 : 54, 40]),
    { stiffness: 300, damping: 22, mass: 0.2 },
  );

  const linkProps = {
    href,
    "aria-label": label,
    className:
      "group relative flex size-full items-center justify-center rounded-lg",
  };
  const content = (
    <>
      {active && (
        <motion.span
          layoutId="dock-active"
          className="absolute inset-1 rounded-md bg-accent shadow-[0_0_20px_rgb(143_79_232/0.6)]"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <Icon
        size={18}
        strokeWidth={1.8}
        className={`relative transition-colors ${
          active ? "text-white" : "text-muted group-hover:text-white"
        }`}
      />
      <span className="pointer-events-none absolute top-full mt-2 translate-y-1 rounded-md bg-surface px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
        {label}
      </span>
    </>
  );

  return (
    <motion.li ref={ref} style={{ width: size, height: size }}>
      {external ? (
        <a {...linkProps} target="_blank" rel="noreferrer">
          {content}
        </a>
      ) : (
        <Link {...linkProps} aria-current={active ? "page" : undefined}>
          {content}
        </Link>
      )}
    </motion.li>
  );
}
