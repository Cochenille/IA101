---
layout: home
title: IA101 — Les bases des outils d'IA
hero:
  name: IA101
  text: Les bases des outils d'IA
  tagline: Apprendre à utiliser l'IA de façon efficace, critique et responsable.
  actions:
    - theme: brand
      text: Commencer le module 1
      link: /modules/01-premiers-pas/
    - theme: alt
      text: Calendrier
      link: /plan-cours/calendrier
---

<section id="semaine-1">
<div class="relative flex py-5 items-center mt-10">
   <div class="grow border-t border-gray-400"></div>
   <span class="shrink mx-4 text-gray-400">Semaine 1</span>
  <div class="grow border-t border-gray-400"></div>
</div>
<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
  <WeeklyTodo
    title="À faire cette semaine — En classe"
    subtitle="Activités réalisées pendant la séance."
    :steps="[
      {
        title: 'Module 1 — Premiers pas',
        links: [
          { text: 'Présentation', href: '/modules/01-premiers-pas/', variant: 'primary' }
        ]
      },
      {
        title: 'Laboratoire 1 — Premiers échanges',
        links: [
          { text: 'Laboratoire 1', href: '/labs/lab01-premiers-echanges', variant: 'primary' }
        ]
      }
    ]"
  />

  <WeeklyTodo
    title="À préparer / compléter"
    subtitle="À compléter de votre côté."
    :steps="[
      {
        title: 'Terminer le laboratoire 1',
        links: [
          { text: 'Laboratoire 1', href: '/labs/lab01-premiers-echanges', variant: 'secondary' }
        ]
      }
    ]"
  />
</div>
</section>
