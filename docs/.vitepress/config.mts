import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    base: "/IA101/",
    lang: "fr-CA",
    cleanUrls: true,
    title: "IA101",
    description:
      "Développer avec l'IA de façon professionnelle — Plan de cours, séances, calendrier et projet fil rouge",
    themeConfig: {
      // logo: "/logos/logo.png",

      nav: [
        { text: "Plan de cours", link: "/plan-cours/" },
        { text: "Calendrier", link: "/plan-cours/calendrier" },
        {
          text: "Séances",
          items: [
            { text: "1 — Comprendre la machine", link: "/seances/01-comprendre-la-machine" },
            { text: "2 — Contexte et boucle agentique", link: "/seances/02-contexte-et-boucle-agentique" },
            { text: "3 — Développement guidé par la spec", link: "/seances/03-developpement-guide-par-la-spec" },
            { text: "4 — Orchestration et pratique pro", link: "/seances/04-orchestration-et-pratique-pro" },
          ],
        },
        { text: "Jumelo", link: "https://github.com/Cochenille/Jumelo" },
      ],

      sidebar: [
        {
          text: "Documents généraux",
          items: [
            { text: "Plan de cours", link: "/plan-cours/" },
            { text: "Calendrier", link: "/plan-cours/calendrier" },
          ],
        },
        {
          text: "Séances",
          collapsed: false,
          items: [
            { text: "1 — Comprendre la machine et bien formuler sa demande", link: "/seances/01-comprendre-la-machine" },
            { text: "2 — Contexte et boucle agentique", link: "/seances/02-contexte-et-boucle-agentique" },
            { text: "3 — Développement guidé par la spécification", link: "/seances/03-developpement-guide-par-la-spec" },
            { text: "4 — Orchestration et pratique professionnelle", link: "/seances/04-orchestration-et-pratique-pro" },
          ],
        },
        {
          text: "Projet fil rouge",
          items: [{ text: "Jumelo sur GitHub", link: "https://github.com/Cochenille/Jumelo" }],
        },
      ],

      outline: { level: [2, 3], label: "Sur cette page" },
      docFooter: { prev: "Page précédente", next: "Page suivante" },
      darkModeSwitchLabel: "Apparence",
      sidebarMenuLabel: "Menu",
      returnToTopLabel: "Retour en haut",

      search: {
        provider: "local",
      },
    },

    // Sans ceci, le serveur de dev affiche une page blanche
    // (fastdom, utilisé par mermaid, n'a pas d'export par défaut en ESM).
    vite: {
      optimizeDeps: {
        include: ["fastdom", "fastdom/extensions/fastdom-promised.js"],
      },
    },
  })
);
