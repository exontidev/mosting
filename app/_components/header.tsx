import Link from "next/link";

export function Header() {
  return (
    <header className="grid h-12 place-items-center border-b border-fg md:h-14">
      <Link href="/" className="font-display text-2xl md:text-3xl">
        mosting
      </Link>
    </header>
  );
}
