import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Portfolio from "@/components/Portfolio";
import { EDITIONS, PERSONAL, type RoleId } from "@/lib/constants";

// Role editions: /for/ai and /for/fullstack. The proxy also serves them for
// /?role=ai and /?role=fullstack, which is the link format to share.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(EDITIONS).map((role) => ({ role }));
}

function editionOf(role: string) {
  return role in EDITIONS ? EDITIONS[role as RoleId] : null;
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const edition = editionOf((await params).role);
  if (!edition) return {};
  return {
    title: edition.title,
    description: edition.thesis,
    openGraph: { title: edition.title, description: edition.thesis, type: "website" },
    twitter: { card: "summary", title: edition.title, description: edition.thesis },
    authors: [{ name: PERSONAL.name }],
  };
}

export default async function RoleEdition({ params }: { params: Promise<{ role: string }> }) {
  const edition = editionOf((await params).role);
  if (!edition) notFound();
  return <Portfolio role={edition.id} />;
}
