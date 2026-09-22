import { site } from '@/lib/site';

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 px-6">
      <h1 className="font-serif text-4xl">{site.name}</h1>
      <p className="text-neutral-600">
        Basis-Branch ohne Design. Die beiden Entwürfe liegen auf den Branches{' '}
        <code>Version1</code> und <code>entwurf</code>.
      </p>
    </main>
  );
}
