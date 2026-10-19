type JumpLinksProps = {
  readonly label: string;
  readonly links: readonly { readonly href: string; readonly label: string }[];
};

/** Sprungmarken im dunklen Seitenkopf – führen zu Abschnitten derselben Seite. */
export function JumpLinks({ label, links }: JumpLinksProps) {
  return (
    <nav aria-label={label} className="mt-8">
      <ul className="flex list-none flex-wrap gap-2 p-0">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-flex min-h-[40px] items-center border border-white/25 px-3.5 text-[0.85rem] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-charcoal"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
