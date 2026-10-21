import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GuideDownload } from "@/components/GuideDownload";
import { MEMBERSHIP_URL, ASSOCIATION_EMAIL } from "@/lib/data";
import { Menu, X, PawPrint } from "lucide-react";
import logo from "@/assets/logo-lvdc.png";

const NAV = [
  { to: "/annuaire", label: "Annuaire" },
  { to: "/services", label: "Accompagnements" },
  { to: "/partenaires", label: "Partenaires" },
  { to: "/agenda", label: "Activités & Agenda" },
  { to: "/association", label: "L'association" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-card/85 px-5 py-2.5 shadow-lg backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 font-display text-base font-bold text-primary">
          <img src={logo} alt="Logo La Voix du Chien" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-sun/60" />
          <span className="leading-tight">La Voix du Chien<span className="block font-sans text-[11px] font-medium text-muted-foreground">Le chien au cœur</span></span>
        </Link>
        <nav className="hidden gap-0 xl:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-2 py-1.5 text-sm font-medium transition hover:bg-secondary" activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && (
        <nav className="mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl border bg-card p-3 shadow-lg xl:hidden">
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
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3">
        <div>
          <img src={logo} alt="" width={64} height={64} className="mb-4 h-16 w-16 rounded-full ring-2 ring-sun/60" />
          <p className="font-display text-2xl">La Voix du Chien</p>
          <p className="mt-1 text-sm italic text-sun">Le chien au cœur, l’humain à ses côtés.</p>
          <p className="mt-2 text-sm opacity-80">Association au service des chiens et de leurs humains en Seine-et-Marne, Loiret, Yonne, Essonne et alentours.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {NAV.map((n) => <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link>)}
        </div>
        <div className="text-sm">
          <Button asChild variant="secondary"><a href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">Adhérer sur HelloAsso ↗</a></Button>
          <div className="mt-4"><GuideDownload /></div>
          <a href={`mailto:${ASSOCIATION_EMAIL}`} className="mt-4 block break-all underline">{ASSOCIATION_EMAIL}</a>
          <p className="mt-4 opacity-70">© {new Date().getFullYear()} La Voix du Chien</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-36 text-navy-foreground" style={{ backgroundImage: "var(--gradient-night)" }}>
      <PawPrint className="absolute -right-10 -top-6 h-72 w-72 rotate-12 opacity-10" />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-sun">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-6xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg opacity-85">{children}</div>}
      </div>
    </section>
  );
}
