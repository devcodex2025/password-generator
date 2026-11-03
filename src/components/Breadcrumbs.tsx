import Link from 'next/link';
import lang from './lang.json';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /**
   * Route locale. The landmark name must follow the page language, and this
   * component stays a server component, so the label is read from lang.json
   * instead of pulling i18next into the client bundle.
   */
  language?: string;
}

const BREADCRUMB_LABELS = lang.a11y_breadcrumb as Record<string, string>;

export default function Breadcrumbs({ items, language = 'en' }: BreadcrumbsProps) {
  const landmarkLabel = BREADCRUMB_LABELS[language] ?? BREADCRUMB_LABELS.en ?? 'Breadcrumb';

  // BreadcrumbList JSON-LD is emitted by the page itself, outside the client
  // shell. Rendering a <script> here (inside a client boundary) triggers a
  // hydration mismatch and the script is never executed.
  return (
    <nav aria-label={landmarkLabel} className="text-sm !text-[#3a6077] dark:!text-[#9ca3af]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="relative inline-flex items-center rounded-md px-1.5 py-1 !text-[#3a6077] dark:!text-[#9ca3af] transition-all duration-200 hover:-translate-y-0.5 hover:!text-[#2A4E63] dark:hover:!text-[#38beff] hover:bg-[#E5F6FF] dark:hover:bg-[#111827] hover:underline underline-offset-4 decoration-2"
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
