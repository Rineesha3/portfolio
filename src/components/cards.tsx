import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import type {
  Achievement,
  Education,
  Experience,
  Project,
  Tool,
} from "@/data/profile";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

function TechChips({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-md bg-surface-2 px-2 py-0.5 text-sm text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

const iconButton =
  "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted transition-colors hover:text-white";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal delay={(index % 2) * 0.06} className="h-full">
      {/* With a live app, the title link stretches over the whole card (the
          GitHub icon sits above it). Without one, only the icon is clickable. */}
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface ${
          project.live
            ? "ring-1 ring-transparent transition hover:bg-[#2c2c2c] hover:ring-accent/70"
            : ""
        }`}
      >
        <div className="relative aspect-[2/1] overflow-hidden bg-surface-2">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-medium">
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="after:absolute after:inset-0 after:rounded-2xl"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <div className="flex gap-2">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className={iconButton}
              >
                <GithubIcon size={18} />
              </a>
            </div>
          </div>
          <p className="mt-2 text-base text-muted">{project.summary}</p>
          <div className="mt-auto pt-4">
            <TechChips tech={project.tech} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// Near-black brand colours (Next.js, Express, Flask…) would vanish on the
// dark card, so those logos are drawn in white instead.
function logoColor(hex: string) {
  const n = parseInt(hex, 16);
  const brightest = Math.max((n >> 16) & 255, (n >> 8) & 255, n & 255);
  return brightest < 60 ? "#ffffff" : `#${hex}`;
}

export function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { icon } = tool;
  const color = logoColor(icon.hex);
  return (
    <Reveal delay={(index % 6) * 0.03}>
      <div className="group inline-flex items-center gap-3 rounded-xl bg-surface py-2 pr-6 pl-2 transition-colors hover:bg-[#2c2c2c]">
        <span className="flex size-8 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {"path" in icon ? (
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              width={20}
              height={20}
              fill={color}
            >
              <path d={icon.path} />
            </svg>
          ) : (
            <icon.Icon aria-hidden size={21} strokeWidth={2.2} color={color} />
          )}
        </span>
        <p className="whitespace-nowrap font-medium">{tool.name}</p>
      </div>
    </Reveal>
  );
}

export function ExperienceCard({
  item,
  index,
}: {
  item: Experience;
  index: number;
}) {
  const cardClass = `group block rounded-2xl bg-surface p-5 ${
    item.companyUrl
      ? "ring-1 ring-transparent transition hover:bg-[#2c2c2c] hover:ring-accent/70"
      : ""
  }`;
  const content = (
    <>
      <div className="flex items-start gap-4">
        {item.logo && (
          <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white p-2">
            <Image
              src={item.logo}
              alt={`${item.company} logo`}
              width={48}
              height={48}
              className="size-full object-contain"
            />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-xl font-medium">
            {item.title}
            <span className="mx-2 font-normal text-muted/60">|</span>
            <span className="inline-flex items-center gap-0.5 underline-offset-4 group-hover:underline">
              {item.company}
              {item.companyUrl && (
                <ArrowUpRight size={18} className="text-accent-hover" />
              )}
            </span>
          </h3>
          <p className="mt-1.5 text-base text-muted">{item.period}</p>
        </div>
      </div>
      <div className="mt-3">
        <TechChips tech={item.tech} />
      </div>
      <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-justify text-base text-muted marker:text-accent">
        {item.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </>
  );

  return (
    <Reveal delay={index * 0.06}>
      {item.companyUrl ? (
        <a
          href={item.companyUrl}
          target="_blank"
          rel="noreferrer"
          className={cardClass}
        >
          {content}
        </a>
      ) : (
        <div className={cardClass}>{content}</div>
      )}
    </Reveal>
  );
}

export function EducationCard({
  item,
  index,
}: {
  item: Education;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="flex items-start gap-4 rounded-2xl bg-surface p-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-white">
          <GraduationCap size={22} strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <h3 className="text-xl font-medium">{item.degree}</h3>
          <p className="mt-1.5 text-base text-muted">
            {item.school} · {item.period}
          </p>
          {item.detail && (
            <p className="mt-1 text-base text-muted">{item.detail}</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function AchievementCard({
  item,
  index,
}: {
  item: Achievement;
  index: number;
}) {
  return (
    <Reveal delay={(index % 2) * 0.06} className="h-full">
      <div className="flex h-full items-start gap-3 rounded-xl bg-surface p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-white">
          <item.icon size={18} strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="font-medium">{item.title}</p>
          <p className="mt-1 text-base text-muted">{item.detail}</p>
        </div>
      </div>
    </Reveal>
  );
}
