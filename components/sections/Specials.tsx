import { SectionLabel } from '@/components/ui/SectionLabel';
import { specials } from '@/content/home';

export function Specials() {
  return (
    <section
      aria-labelledby="specials-title"
      className="relative isolate overflow-hidden bg-paper py-[132px] max-md:py-[94px]"
    >
      <div className="shell relative z-[2]">
        <div className="mb-[68px] grid grid-cols-[0.5fr_1.5fr] gap-[50px] max-md:grid-cols-1 max-md:gap-8">
          <SectionLabel number="05">{specials.label}</SectionLabel>
          <h2 id="specials-title" className="display-2">
            {specials.title}
          </h2>
        </div>

        <ul className="grid list-none grid-cols-4 border border-line p-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {specials.items.map((item, index) => (
            <li
              key={item.number}
              className={[
                'group flex min-h-[360px] flex-col border-r border-line p-[30px] transition-colors duration-200 last:border-r-0 hover:bg-olive hover:text-white',
                index === 1 ? 'max-lg:border-r-0' : '',
                index < 2 ? 'max-lg:border-b max-lg:border-b-line' : '',
                'max-sm:min-h-[280px] max-sm:border-r-0 max-sm:border-b max-sm:border-b-line',
              ].join(' ')}
            >
              <span className="text-[0.73rem] text-bronze">{item.number}</span>
              <h3 className="mt-[82px] mb-4 font-serif text-[2rem] leading-tight font-normal">
                {item.title}
              </h3>
              <p className="text-[0.9rem] text-muted group-hover:text-white/70">{item.body}</p>
              <span aria-hidden="true" className="mt-auto self-end text-[1.3rem]">
                ↗
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
