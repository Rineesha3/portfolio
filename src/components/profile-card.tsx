import { Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

const iconLink =
  "flex size-10 items-center justify-center rounded-full bg-surface-2 transition-colors hover:text-white";

export function ProfileCard() {
  return (
    <Reveal>
      <header className="flex flex-col gap-5 rounded-2xl bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight">
            {profile.name}
          </h2>
          <p className="mt-1.5 text-base text-white/80">
            {profile.role}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-base text-muted">
            <MapPin size={16} strokeWidth={1.8} className="shrink-0" />
            {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-muted">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={iconLink}
          >
            <GithubIcon />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={iconLink}
          >
            <LinkedinIcon />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className={iconLink}
          >
            <Mail size={18} strokeWidth={1.8} />
          </a>
        </div>
      </header>
    </Reveal>
  );
}
