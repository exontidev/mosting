export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-2xl border border-fg">
        <p className="border-b border-fg px-4 py-2 text-xs uppercase tracking-wide text-muted md:px-6">
          Empty
        </p>
        <p className="p-4 text-3xl font-bold uppercase leading-none tracking-tight md:p-6 md:text-5xl">
          nothing here but chickens!
          <span
            aria-hidden
            className="ml-2 inline-block h-[0.75em] w-[0.5em] animate-blink bg-fg motion-reduce:animate-none"
          />
        </p>
      </div>
    </div>
  );
}
