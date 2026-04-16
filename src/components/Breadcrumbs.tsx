import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm !text-[#3a6077] dark:!text-[#9bdfff]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="relative inline-flex items-center rounded-md px-1.5 py-1 !text-[#3a6077] dark:!text-[#9bdfff] transition-all duration-200 hover:-translate-y-0.5 hover:!text-[#2A4E63] dark:hover:!text-[#d7f2ff] hover:bg-[#E5F6FF] dark:hover:bg-[#111827] hover:underline underline-offset-4 decoration-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#071016] dark:text-[#e0e0e0]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
