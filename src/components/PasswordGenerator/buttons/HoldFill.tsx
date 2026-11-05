/**
 * Visual half of the hold action: fills over the same 200ms delay that ends at
 * the hold threshold. Renders behind the button content, so the parent must be
 * `group`, positioned and clipped (rounded-full / overflow-hidden).
 */
const HoldFill = ({ className = '' }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-200 ease-linear group-data-[holding=true]:scale-x-100 motion-reduce:transition-none ${className}`}
  />
);

export default HoldFill;
