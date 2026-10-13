/** Sprunglink zum Hauptinhalt – erscheint erst bei Tastaturfokus. */
export function SkipLink() {
  return (
    <a href="#main" className="fixed top-[-100px] left-3 z-[100] bg-white px-3.5 py-2.5 focus:top-3">
      Zum Inhalt
    </a>
  );
}
