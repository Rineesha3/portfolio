import type { Metadata } from "next";
import { projects } from "@/data/profile";
import { ProjectCard } from "@/components/cards";
import { PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageTitle>Projects</PageTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </>
  );
}
