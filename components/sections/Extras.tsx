import { Eyebrow } from '@/components/ui/SectionLabel';
import { extras } from '@/content/home';

export function Extras() {
  return (
    <section
      aria-labelledby="extras-title"
      className="relative isolate overflow-hidden bg-mist py-[132px] max-md:py-[92px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[260px] -left-[210px] -z-10 size-[720px] -rotate-[22deg] bg-[url('/assets/logo.png')] bg-contain bg-center bg-no-repeat opacity-[0.026] grayscale max-md:opacity-[0.02] max-sm:-left-[390px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[4%] -right-[9%] -z-10 h-[118%] w-[42%] rotate-[8deg] rounded-[48%_0_0_55%] border border-[rgba(83,92,38,.09)] max-sm:hidden"
      />

      <div className="shell relative z-[2] grid grid-cols-[0.8fr_1.2fr] gap-[100px] max-lg:gap-[55px] max-md:grid-cols-1">
        <div className="sticky top-10 self-start max-md:static">
          <Eyebrow>{extras.label}</Eyebrow>
          <h2 id="extras-title" className="display-2">
            {extras.title}
          </h2>
          <p className="mt-[30px] max-w-[430px] text-stone">{extras.body}</p>
        </div>

        <ul className="list-none border-t border-line p-0">
          {extras.items.map((item) => (
            <li key={item.number}>
              <a
                href="#kontakt"
                className="grid min-h-[112px] grid-cols-[54px_1fr_1fr_30px] items-center gap-[18px] border-b border-line transition-[color,padding] duration-200 hover:pl-2 hover:text-olive max-sm:min-h-24 max-sm:grid-cols-[40px_1fr_25px]"
              >
                <span className="text-[0.73rem] text-stone">{item.number}</span>
                <strong className="text-[1.18rem]">{item.title}</strong>
                <span className="text-[0.88rem] text-stone max-sm:hidden">{item.text}</span>
                <span aria-hidden="true" className="text-[1.2rem]">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
