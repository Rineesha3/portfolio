import type { Metadata } from "next";
import { experiences } from "@/data/profile";
import { ExperienceCard } from "@/components/cards";
import { PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencesPage() {
  return (
    <>
      <PageTitle>Experience</PageTitle>
      {experiences.map((e, i) => (
        <ExperienceCard key={e.title} item={e} index={i} />
      ))}
    </>
  );
}
