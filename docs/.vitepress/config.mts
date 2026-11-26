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
      "Les bases de l'utilisation des outils d'IA — Modules, laboratoires, calendrier et ressources",
    themeConfig: {
      // logo: "/logos/logo.png",

      nav: [
        { text: "Calendrier", link: "/plan-cours/calendrier" },
        {
          text: "Modules",
          items: [
            { text: "Module 1 — Premiers pas", link: "/modules/01-premiers-pas/" },
          ],
        },
      ],

      sidebar: [
        {
          text: "Documents généraux",
          items: [{ text: "Calendrier", link: "/plan-cours/calendrier" }],
        },
        {
          text: "Modules du cours",
          collapsed: false,
          items: [
            {
              text: "Module 1 — Premiers pas",
              collapsed: false,
              items: [
                { text: "Présentation", link: "/modules/01-premiers-pas/" },
              ],
            },
          ],
        },
        {
          text: "Laboratoires",
          collapsed: true,
          items: [
            { text: "Lab 01 — Premiers échanges", link: "/labs/lab01-premiers-echanges" },
          ],
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
