import type { Metadata } from "next";
import { PageTitle } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageTitle>Contact</PageTitle>
      <Reveal delay={0.1}>
        <ContactForm />
      </Reveal>
    </>
  );
}
