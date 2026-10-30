import { ProfileCard } from "@/components/profile-card";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pt-24 pb-20 sm:px-6 sm:pt-28">
      <ProfileCard />
      {children}
    </main>
  );
}
