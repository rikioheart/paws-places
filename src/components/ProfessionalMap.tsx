import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, LayerGroup } from "leaflet";
import { CATEGORIES, type Pro } from "@/lib/data";

export default function ProfessionalMap({ pros, selected, onSelect }: { pros: Pro[]; selected: Pro | null; onSelect: (p: Pro) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const group = useRef<LayerGroup | null>(null);
  const select = useRef(onSelect);
  select.current = onSelect;
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let disposed = false;
    const element = container.current;
    if (!element) return;
    import("leaflet").then(L => {
      if (disposed) return;
      const instance = L.map(element, { scrollWheelZoom: false }).setView([48.3, 2.8], 8);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(instance);
      map.current = instance;
      group.current = L.layerGroup().addTo(instance);
      setReady(true);
      const observer = new ResizeObserver(() => instance.invalidateSize());
      observer.observe(element);
      instance.once("unload", () => observer.disconnect());
    }).catch(() => setError(true));
    return () => { disposed = true; map.current?.remove(); map.current = null; group.current = null; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    let disposed = false;
    import("leaflet").then(L => {
      const instance = map.current;
      const markers = group.current;
      if (disposed || !instance || !markers) return;
      markers.clearLayers();
      const positions: [number, number][] = [];
      pros.forEach(p => {
        if (p.lat === undefined || p.lng === undefined) return;
        const position: [number, number] = [p.lat, p.lng];
        positions.push(position);
        const button = document.createElement("button");
        button.type = "button";
        button.className = `professional-pin pin-${p.category}${selected?.id === p.id ? " is-selected" : ""}`;
        button.textContent = CATEGORIES[p.category].emoji;
        button.setAttribute("aria-label", p.name);
        button.addEventListener("click", () => select.current(p));
        L.marker(position, { icon: L.divIcon({ html: button, className: "professional-marker", iconSize: [38, 38], iconAnchor: [19, 19] }), keyboard: false }).addTo(markers);
      });
      if (selected?.lat !== undefined && selected.lng !== undefined && pros.some(p => p.id === selected.id)) instance.flyTo([selected.lat, selected.lng], 11, { duration: .5 });
      else if (positions.length) instance.fitBounds(L.latLngBounds(positions), { padding: [35, 35], maxZoom: 11 });
    });
    return () => { disposed = true; };
  }, [pros, selected, ready]);

  return <div className="relative h-full min-h-[380px] bg-secondary">
    <div ref={container} className="absolute inset-0" role="region" aria-label="Carte des professionnels OpenStreetMap" />
    {(!ready || error) && <p className="absolute inset-x-4 top-4 z-10 rounded-lg bg-card p-3 text-sm">{error ? "La carte est indisponible. Les fiches restent accessibles dans l’annuaire." : "Chargement de la carte…"}</p>}
  </div>;
}