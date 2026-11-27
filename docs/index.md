---
layout: home
title: IA101 — Développer avec l'IA
hero:
  name: IA101
  text: Développer avec l'IA, de façon professionnelle
  tagline: Du bon usage d'un agent jusqu'à l'orchestration, en quatre séances sur un vrai projet.
  actions:
    - theme: brand
      text: Séance 1
      link: /seances/01-comprendre-la-machine
    - theme: alt
      text: Plan de cours
      link: /plan-cours/
    - theme: alt
      text: Calendrier
      link: /plan-cours/calendrier
---

<section id="seance-1">
<div class="relative flex py-5 items-center mt-10">
   <div class="grow border-t border-gray-400"></div>
   <span class="shrink mx-4 text-gray-400">Séance 1 — lundi 30 novembre</span>
  <div class="grow border-t border-gray-400"></div>
</div>
<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
  <WeeklyTodo
    title="Avant la séance"
    subtitle="À faire de votre côté avant lundi."
    :steps="[
      {
        title: 'Activer GitHub Copilot avec GitHub Education',
        description: 'La demande peut prendre quelques jours à être approuvée : faites-la tout de suite.',
        links: [
          { text: 'GitHub Education', href: 'https://education.github.com/', variant: 'secondary' }
        ]
      },
      {
        title: 'Installer Visual Studio 2026 et le SDK .NET 10',
        description: 'Vérifiez avec la commande dotnet --list-sdks.',
        links: [
          { text: 'Plan de cours', href: '/plan-cours/', variant: 'secondary' }
        ]
      },
      {
        title: 'Lire la mise en situation de Jumelo',
        links: [
          { text: 'Jumelo sur GitHub', href: 'https://github.com/Cochenille/Jumelo', variant: 'secondary' }
        ]
      }
    ]"
  />

  <WeeklyTodo
    title="En classe"
    subtitle="Activités réalisées pendant la séance."
    :steps="[
      {
        title: 'Séance 1 — Comprendre la machine et bien formuler sa demande',
        time: '3 h',
        links: [
          { text: 'Plan de la séance', href: '/seances/01-comprendre-la-machine', variant: 'primary' }
        ]
      },
      {
        title: 'Créer votre dépôt à partir du template Jumelo',
        links: [
          { text: 'Use this template', href: 'https://github.com/Cochenille/Jumelo', variant: 'primary' }
        ]
      }
    ]"
  />
</div>
</section>
