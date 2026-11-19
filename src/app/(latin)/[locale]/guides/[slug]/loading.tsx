export default function GuideArticleLoading() {
  return (
    <section className="max-w-4xl mx-auto px-4 pt-10 pb-16" aria-busy="true" aria-live="polite">
      <article className="mt-4 rounded-24 border border-[#E5F6FF] dark:border-[#374151] bg-white dark:bg-[#171717] p-6 md:p-8">
        <div className="h-3 w-28 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
        <div className="mt-3 h-10 w-11/12 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
        <div className="mt-5 w-full rounded-16 aspect-[40/21] bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
        <div className="mt-4 h-4 w-full rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
        <div className="mt-2 h-4 w-10/12 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
        <div className="mt-8 space-y-4">
          <div className="h-8 w-2/3 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
          <div className="h-4 w-full rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
          <div className="h-4 w-full rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-[#E5F6FF] dark:bg-[#111827] animate-pulse" />
        </div>
      </article>
    </section>
  );
}
