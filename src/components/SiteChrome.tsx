import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, PawPrint } from "lucide-react";

const NAV = [
  { to: "/annuaire", label: "Carte & annuaire" },
  { to: "/partenaires", label: "Partenaires" },
  { to: "/agenda", label: "Agenda" },
  { to: "/association", label: "L'association" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-card/85 px-5 py-2.5 shadow-lg backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground"><PawPrint className="h-5 w-5" /></span>
          La Voix du Chien
        </Link>
        <nav className="hidden gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-3 py-1.5 text-sm font-medium transition hover:bg-secondary" activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl border bg-card p-3 shadow-lg md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-medium hover:bg-secondary">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">La Voix du Chien</p>
          <p className="mt-2 text-sm opacity-80">Association au service des chiens et de leurs humains en Seine-et-Marne, Loiret, Yonne, Essonne et alentours.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {NAV.map((n) => <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link>)}
        </div>
        <div className="text-sm">
          <a href="/guide-vacances-avec-son-chien.pdf" download className="inline-block rounded-full bg-sun px-5 py-2.5 font-semibold text-foreground">📘 Guide vacances gratuit</a>
          <p className="mt-4 opacity-70">© {new Date().getFullYear()} La Voix du Chien</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-primary pb-16 pt-36 text-primary-foreground">
      <PawPrint className="absolute -right-10 -top-6 h-72 w-72 rotate-12 opacity-10" />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-sun">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-6xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg opacity-85">{children}</div>}
      </div>
    </section>
  );
}
