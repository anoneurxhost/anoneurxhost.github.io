import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  name: string;
  to?: string;
}

/** Small, theme-agnostic breadcrumb trail used on section and profile pages. */
const BreadcrumbTrail = ({ items, className = "" }: { items: Crumb[]; className?: string }) => (
  <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
      <li className="flex items-center gap-1.5">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>
      </li>
      {items.map((c, i) => (
        <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
          {c.to && i < items.length - 1 ? (
            <Link to={c.to} className="hover:text-primary transition-colors">
              {c.name}
            </Link>
          ) : (
            <span aria-current="page" className="text-foreground/80 font-medium">
              {c.name}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default BreadcrumbTrail;
