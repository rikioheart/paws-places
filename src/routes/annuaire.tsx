import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Phone, Mail, Clock, MapPin, X, ExternalLink } from "lucide-react";
import { CATEGORIES, PROS, type Category, type Pro } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/SiteChrome";

type S = { cat?: Category | undefined };

export const Route = createFileRoute("/annuaire")({
  validateSearch: (s: Record<string, unknown>): S => {
    const c = s["cat"];
    return { cat: typeof c === "string" && c in CATEGORIES ? (c as Category) : undefined };
  },
  head: () => ({
    meta: [
      { title: "Carte & annuaire des pros canins — La Voix du Chien" },
      { name: "description", content: "Carte interactive des éducateurs, photographes, pet sitters, pros du bien-être et du secours canin en 77, 45, 89, 91." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Carte & annuaire des professionnels canins" },
      { property: "og:description", content: "Filtrez par métier et département et trouvez le bon pro près de chez vous." },
    ],
  }),
  component: Annuaire,
});

const DEPTS = ["77", "45", "89", "91", "Limitrophe"] as const;
const B = { minLng: 1.65, maxLng: 4.15, minLat: 47.25, maxLat: 49.5 };
const proj = (lat: number, lng: number) => ({
  x: ((lng - B.minLng) / (B.maxLng - B.minLng)) * 100,
  y: ((B.maxLat - lat) / (B.maxLat - B.minLat)) * 100,
});
const AREAS = [
  { d: "91", lat: 48.52, lng: 2.3, r: 15 },
  { d: "77", lat: 48.5, lng: 2.95, r: 22 },
  { d: "45", lat: 48.0, lng: 2.45, r: 20 },
  { d: "89", lat: 47.95, lng: 3.4, r: 19 },
];

function Annuaire() {
  const { cat } = Route.useSearch();
  const [cats, setCats] = useState<Category[]>(cat ? [cat] : []);
  const [depts, setDepts] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Pro | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const list = useMemo(
    () =>
      PROS.filter(
        (p) =>
          (!cats.length || cats.includes(p.category)) &&
          (!depts.length || depts.includes(p.dept)) &&
          (!q || `${p.name} ${p.city} ${p.zone}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [cats, depts, q],
  );
  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <>
      <PageHero kicker="Carte interactive" title="Les pros du chien, près de chez vous.">
        Un réseau de professionnels en Seine-et-Marne, Loiret, Yonne, Essonne et alentours. Les repères indiquent les communes, pas les adresses de consultation.
      </PageHero>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 rounded-3xl border bg-card p-5 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nom, ville, zone…" className="w-full rounded-full border bg-background py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORIES) as Category[]).map((k) => {
              const on = cats.includes(k);
              return (
                <button key={k} onClick={() => toggle(cats, k, setCats)} className="rounded-full border-2 px-4 py-2 text-sm font-medium transition" style={{ borderColor: CATEGORIES[k].color, background: on ? CATEGORIES[k].color : "transparent", color: on ? "var(--card)" : undefined }}>
                  {CATEGORIES[k].emoji} {CATEGORIES[k].label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Secteur :</span>
            {DEPTS.map((d) => (
              <button key={d} onClick={() => toggle(depts, d, setDepts)} className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${depts.includes(d) ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{d}</button>
            ))}
            {(cats.length > 0 || depts.length > 0 || q) && (
              <button onClick={() => { setCats([]); setDepts([]); setQ(""); }} className="ml-auto text-sm text-accent underline">Réinitialiser</button>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-secondary shadow-inner lg:sticky lg:top-28 lg:self-start">
            <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <defs>
                <pattern id="dots" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.25" fill="var(--border)" /></pattern>
              </defs>
              <rect width="100" height="75" fill="url(#dots)" />
              <path d="M5 20 Q 30 25 45 35 T 70 45 T 98 70" stroke="var(--cat-bien)" strokeWidth="0.8" fill="none" opacity="0.5" />
            </svg>
            {AREAS.map((a) => {
              const p = proj(a.lat, a.lng);
              return (
                <div key={a.d} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/25 bg-primary/5" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${a.r * 2}%`, aspectRatio: "1" }}>
                  <span className="absolute left-1/2 top-2 -translate-x-1/2 font-display text-2xl font-bold text-primary/30">{a.d}</span>
                </div>
              );
            })}
            {list.filter((p) => p.lat !== undefined && p.lng !== undefined).map((p) => {
              if (p.lat === undefined || p.lng === undefined) return null;
              const c = proj(p.lat, p.lng);
              const active = sel?.id === p.id || hover === p.id;
              return (
                <button key={p.id} onClick={() => setSel(p)} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)} aria-label={p.name} className="absolute z-10 -translate-x-1/2 -translate-y-full" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                  {active && <span className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 animate-ping-soft rounded-full" style={{ background: CATEGORIES[p.category].color }} />}
                  <span className={`grid h-10 w-10 place-items-center rounded-full rounded-br-none border-2 border-card text-lg shadow-lg transition ${active ? "scale-125" : ""}`} style={{ background: CATEGORIES[p.category].color, transform: "rotate(45deg)" }}>
                    <span style={{ transform: "rotate(-45deg)" }}>{CATEGORIES[p.category].emoji}</span>
                  </span>
                  {active && <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">{p.name}</span>}
                </button>
              );
            })}
            {sel && (
              <div className="absolute inset-x-3 bottom-3 z-20 max-h-[85%] overflow-y-auto rounded-2xl border bg-card p-5 shadow-2xl animate-in slide-in-from-bottom-4">
                <button onClick={() => setSel(null)} className="absolute right-3 top-3" aria-label="Fermer"><X className="h-5 w-5" /></button>
                <ProDetails p={sel} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">{list.length} résultat{list.length > 1 ? "s" : ""}</p>
            {list.map((p) => (
              <button key={p.id} onClick={() => setSel(p)} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)} className={`rounded-2xl border-l-4 bg-card p-4 text-left shadow-sm transition hover:shadow-md ${sel?.id === p.id ? "ring-2 ring-ring" : ""}`} style={{ borderLeftColor: CATEGORIES[p.category].color }}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-lg font-semibold">{p.name}</p>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold">{p.dept}</span>
                </div>
                <p className="text-sm text-muted-foreground">{CATEGORIES[p.category].emoji} {CATEGORIES[p.category].label} · {p.city}</p>
              </button>
            ))}
            {!list.length && <p className="rounded-2xl bg-card p-6 text-center text-muted-foreground">Aucun professionnel ne correspond. Essayez d'élargir vos filtres 🐶</p>}
          </div>
        </div>
      </section>
    </>
  );
}

function ProDetails({ p }: { p: Pro }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: CATEGORIES[p.category].color }}>{CATEGORIES[p.category].label}</p>
      <p className="font-display text-2xl font-semibold">{p.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
      <div className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {p.zone}</span>
        <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> {p.hours}</span>
        {p.phone && <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:underline"><Phone className="h-4 w-4 text-accent" /> {p.phone}</a>}
        {p.email && <a href={`mailto:${p.email}`} className="flex items-center gap-2 hover:underline"><Mail className="h-4 w-4 text-accent" /> {p.email}</a>}
      </div>
      <Button asChild variant="link" className="mt-3 px-0"><a href={p.website} target="_blank" rel="noopener noreferrer">Contacter ce professionnel <ExternalLink /></a></Button>
    </div>
  );
}
