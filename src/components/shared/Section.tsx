// Paper-style section: a left margin column (section number, title, notes)
// and the main content in the remaining nine columns. On small screens the
// margin column stacks above the content.

export default function Section({
  id,
  number,
  kicker,
  title,
  intro,
  margin,
  children,
}: {
  id: string;
  number: string;
  kicker: string;
  title: string;
  intro?: string;
  margin?: React.ReactNode;
  children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-t border-rule"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-6 gap-y-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12">
        <header className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <p className="label">
              <span className="text-seal">{number}</span> · {kicker}
            </p>
            <h2
              id={headingId}
              className="font-display mt-3 text-[2.25rem] leading-[1.1] text-ink"
            >
              {title}
            </h2>
            {intro && (
              <p className="mt-4 text-[15px] leading-relaxed text-graphite">
                {intro}
              </p>
            )}
            {margin && <div className="mt-8">{margin}</div>}
          </div>
        </header>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
