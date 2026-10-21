import { Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_URL } from "@/lib/data";

export function AudienceJourneys() {
  return <section className="bg-secondary py-14" id="rejoindre">
    <div className="mx-auto max-w-6xl px-6">
      <p className="font-semibold text-accent">Une association, des liens qui comptent</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl">Votre place dans le collectif.</h2>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <HeartHandshake className="h-8 w-8 text-accent" />
          <h3 className="mt-4 text-2xl font-semibold">Vous vivez avec un chien</h3>
          <p className="mt-3 text-muted-foreground">Mieux le comprendre, partager des expériences et rencontrer des personnes qui ont les mêmes questions que vous.</p>
          <ul className="mt-5 space-y-3">{["Des balades et ateliers pour nourrir votre complicité.", "Un réseau de professionnels pour vous orienter selon vos besoins.", "Des ressources et des échanges pour avancer sans rester seul.", "Des avantages publiés par nos boutiques partenaires."].map(t => <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{t}</span></li>)}</ul>
          <Button asChild className="mt-6"><Link to="/agenda">Découvrir les activités <ArrowRight /></Link></Button>
        </div>
        <div className="border-t border-primary/20 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <Users className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-2xl font-semibold">Vous êtes professionnel du chien</h3>
          <p className="mt-3 text-muted-foreground">Croisons nos regards et faisons grandir les projets : une pratique indépendante, un engagement collectif.</p>
          <ul className="mt-5 space-y-3">{["Faire connaître votre activité grâce à l’annuaire du réseau.", "Construire des accompagnements pluridisciplinaires entre professionnels.", "Imaginer ensemble des événements et des rencontres pédagogiques.", "Partager vos expériences dans des groupes d’entraide et de discussion."].map(t => <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{t}</span></li>)}</ul>
          <Button asChild variant="outline" className="mt-6"><Link to="/contact" search={{ profil: "professionnel" }}>Parlons de votre participation <ArrowRight /></Link></Button>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-primary/20 pt-7 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-muted-foreground">Adhérer, c’est soutenir les actions de l’association et faire vivre ce réseau. Les conditions d’adhésion sont présentées sur HelloAsso.</p>
        <Button asChild><a href={MEMBERSHIP_URL} target="_blank" rel="noopener noreferrer">Adhérer sur HelloAsso <ArrowRight /></a></Button>
      </div>
    </div>
  </section>;
}