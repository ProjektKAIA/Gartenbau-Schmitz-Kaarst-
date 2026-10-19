import { process } from '@/content/home';

/** Die vier Schritte als Zeitleiste (Punkt auf der Linie, Nummer, Titel, Text) – Startseite und Seite /ablauf. */
export function ProcessSteps() {
  return (
    <>
      <div aria-hidden="true" className="mt-6 h-px bg-line max-md:hidden" />

      <ol className="mt-[-8px] grid list-none grid-cols-4 gap-[34px] p-0 max-md:mt-0 max-md:grid-cols-2 max-md:gap-x-7 max-md:gap-y-[50px] max-sm:grid-cols-1">
        {process.steps.map((step) => (
          <li key={step.number}>
            <span aria-hidden="true" className="mb-6 block size-[15px] rounded-full bg-olive max-md:mb-5" />
            <span className="text-[0.76rem] text-olive">{step.number}</span>
            <h3 className="mt-3 mb-[18px] text-[1.55rem] leading-[1.02] font-bold tracking-[-0.035em]">{step.title}</h3>
            <p className="text-[0.93rem] text-stone">{step.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
