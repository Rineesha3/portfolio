import Link from "next/link";
import { achievements, education, profile, tools } from "@/data/profile";
import { AchievementCard, EducationCard, ToolCard } from "@/components/cards";
import { PageTitle } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export default function AboutPage() {
  return (
    <>
      {/* Fills the rest of the first screen so Education starts below the fold */}
      <section className="flex min-h-[calc(100svh-22rem)] flex-col justify-center gap-6 sm:min-h-[calc(100svh-20rem)]">
        <PageTitle large>
          <span className="text-shimmer">
            Hi, I&rsquo;m {profile.name.split(" ")[0]}.
          </span>
        </PageTitle>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted">{profile.intro}</p>
        </Reveal>
      </section>

      <SectionHeader title="Education" />
      <div className="flex flex-col gap-4">
        {education.map((e, i) => (
          <EducationCard key={e.degree} item={e} index={i} />
        ))}
      </div>

      <SectionHeader title="Skills" />
      <div className="flex flex-wrap gap-3">
        {tools.map((t, i) => (
          <ToolCard key={t.name} tool={t} index={i} />
        ))}
      </div>

      <SectionHeader title="Highlights" />
      <div className="grid gap-3 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <AchievementCard key={a.title} item={a} index={i} />
        ))}
      </div>
    </>
  );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <Reveal className="mt-8 flex items-end justify-between">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-muted hover:text-white">
          View all →
        </Link>
      )}
    </Reveal>
  );
}
