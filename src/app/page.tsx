import Portfolio from "@/components/Portfolio";

// Re-render at most once an hour so the GitHub panel stays current.
export const revalidate = 3600;

export default function Home() {
  return <Portfolio role={null} />;
}
