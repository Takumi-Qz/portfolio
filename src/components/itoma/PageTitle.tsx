export function PageTitle({ children, lead }: { en?: string; children: React.ReactNode; lead?: string }) {
  return (
    <header className="grid gap-6 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-7">
        <h1 data-split="lines" className="font-mincho text-4xl leading-snug tracking-[0.15em] md:text-6xl">{children}</h1>
      </div>
      {lead && <p data-reveal="up" data-delay="0.3" className="max-w-md self-end text-sm leading-[2.2] text-sumi md:col-span-4 md:col-start-9">{lead}</p>}
    </header>
  );
}
