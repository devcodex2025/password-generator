export default function GuidesLoading() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10" aria-busy="true" aria-live="polite">
      <div className="h-8 w-64 rounded bg-[#E5F6FF] dark:bg-[#1f2937] animate-pulse" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            key={index}
            className="rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-5"
          >
            <div className="w-full rounded-16 aspect-[40/21] bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
            <div className="mt-4 h-3 w-28 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
            <div className="mt-3 h-6 w-11/12 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
            <div className="mt-2 h-4 w-full rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
            <div className="mt-2 h-4 w-10/12 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
            <div className="mt-4 h-4 w-1/2 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
          </article>
        ))}
      </div>
    </section>
  );
}
