<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";

type Acteur = "vous" | "modele" | "outil";
type Etape = { acteur: Acteur; texte: string; detail?: string; alerte?: boolean };

const etapes: Etape[] = [
  {
    acteur: "vous",
    texte: "« Dans l'écran Jumelage, affiche « Complet » au lieu de « 0 place(s) restante(s) ». Les tests doivent passer. »",
  },
  { acteur: "modele", texte: "Je dois d'abord trouver où ce texte est affiché." },
  {
    acteur: "outil",
    texte: "Rechercher « place(s) » dans la solution",
    detail: "1 résultat : View/JumelageView.xaml, ligne 47",
  },
  { acteur: "modele", texte: "Je lis la vue et la classe Offre pour comprendre d'où vient le nombre." },
  {
    acteur: "outil",
    texte: "Lire JumelageView.xaml et Model/Offre.cs",
    detail: "Offre expose PlacesRestantes et EstComblee",
  },
  { acteur: "modele", texte: "J'ajoute une propriété TextePlaces à Offre et je modifie la liaison dans la vue." },
  { acteur: "outil", texte: "Modifier Offre.cs et JumelageView.xaml", detail: "2 fichiers modifiés" },
  { acteur: "outil", texte: "Exécuter dotnet build", detail: "Génération réussie" },
  { acteur: "outil", texte: "Exécuter dotnet test", detail: "Aucun test ne couvre TextePlaces" },
  { acteur: "modele", texte: "J'ajoute deux tests : offre avec des places, offre comblée." },
  { acteur: "outil", texte: "Créer un test dans OffreTests.cs, puis exécuter dotnet test", detail: "Tous les tests passent" },
  { acteur: "modele", texte: "« C'est fait : la vue affiche « Complet » quand l'offre est comblée. »" },
  {
    acteur: "vous",
    texte: "Relire le diff, lancer l'application et regarder l'écran avant d'accepter.",
    alerte: true,
  },
];

const index = ref(0);
const liste = ref<HTMLOListElement | null>(null);
// Garde l'étape courante visible dans la trace, sans faire défiler la page.
watch(index, async () => {
  await nextTick();
  if (liste.value) liste.value.scrollTop = liste.value.scrollHeight;
});
const etape = computed(() => etapes[index.value]);
const visibles = computed(() => etapes.slice(0, index.value + 1));

const noms: Record<Acteur, string> = { vous: "Vous", modele: "Modèle", outil: "Outils" };

const tours = computed(
  () => visibles.value.filter((e, i) => e.acteur === "outil" && visibles.value[i - 1]?.acteur === "modele").length
);
</script>

<template>
  <div class="demo">
    <div class="titre">La boucle d'un agent, pas à pas</div>
    <div class="corps">
      <svg viewBox="0 0 240 210" class="schema" role="img" aria-label="Schéma de la boucle agentique">
        <defs>
          <marker id="fleche" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        <g class="liens" stroke="currentColor" fill="none" stroke-width="1.5" marker-end="url(#fleche)">
          <path d="M100,52 L62,118" />
          <path d="M88,160 C110,176 130,176 152,160" />
          <path d="M152,140 C130,124 110,124 88,140" />
          <path d="M60,150 C30,90 70,40 92,40" stroke-dasharray="4 3" />
        </g>
        <g v-for="n in [
          { id: 'vous', x: 120, y: 34 },
          { id: 'modele', x: 52, y: 150 },
          { id: 'outil', x: 188, y: 150 },
        ]" :key="n.id">
          <circle
            :cx="n.x"
            :cy="n.y"
            r="30"
            :class="['noeud', n.id, { actif: etape.acteur === n.id }]"
          />
          <text :x="n.x" :y="n.y + 5" text-anchor="middle" class="etiquette">{{ noms[n.id as Acteur] }}</text>
        </g>
        <text x="120" y="200" text-anchor="middle" class="tours">tours de boucle : {{ tours }}</text>
      </svg>

      <ol ref="liste" class="trace">
        <li
          v-for="(e, i) in visibles"
          :key="i"
          :class="[e.acteur, { courant: i === index, alerte: e.alerte }]"
        >
          <span class="qui">{{ noms[e.acteur] }}</span>
          <span>{{ e.texte }}</span>
          <span v-if="e.detail" class="detail">→ {{ e.detail }}</span>
        </li>
      </ol>
    </div>
    <div class="controles">
      <button :disabled="index === 0" @click="index--">◀ Précédent</button>
      <span>{{ index + 1 }} / {{ etapes.length }}</span>
      <button class="principal" :disabled="index === etapes.length - 1" @click="index++">Suivant ▶</button>
      <button @click="index = 0">Recommencer</button>
    </div>
    <p class="note">
      Dans un chat, c'est vous qui faites la boucle : copier, coller, compiler, recoller l'erreur. Un agent la fait seul,
      avec ses outils. Il vous reste la dernière étape.
    </p>
  </div>
</template>

<style scoped>
.demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  margin: 20px 0;
  background: var(--vp-c-bg-soft);
}
.titre {
  font-weight: 700;
}
.corps {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 16px;
  margin-top: 10px;
  align-items: start;
}
@media (max-width: 640px) {
  .corps {
    grid-template-columns: 1fr;
  }
  .schema {
    max-width: 240px;
    margin: 0 auto;
  }
}
.schema {
  width: 100%;
  color: var(--vp-c-text-2);
}
.noeud {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-divider);
  stroke-width: 3;
  transition: all 0.25s;
}
.noeud.actif.vous {
  fill: #dbeafe;
  stroke: #2563eb;
}
.noeud.actif.modele {
  fill: #ede9fe;
  stroke: #7c3aed;
}
.noeud.actif.outil {
  fill: #dcfce7;
  stroke: #16a34a;
}
.etiquette {
  font-size: 13px;
  font-weight: 600;
  fill: var(--vp-c-text-1);
}
.noeud.actif + .etiquette {
  fill: #111827;
}
.tours {
  font-size: 12px;
  fill: var(--vp-c-text-2);
}
.trace {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 340px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}
.trace li {
  margin: 0;
  padding: 6px 10px;
  border-left: 4px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  opacity: 0.65;
  display: flex;
  flex-direction: column;
}
.trace li.courant {
  opacity: 1;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
}
.trace li.vous {
  border-left-color: #2563eb;
}
.trace li.modele {
  border-left-color: #7c3aed;
}
.trace li.outil {
  border-left-color: #16a34a;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}
.trace li.alerte {
  border-left-color: #dc2626;
  font-weight: 600;
}
.qui {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-base);
}
.detail {
  color: var(--vp-c-text-2);
}
.controles {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
  font-size: 14px;
  flex-wrap: wrap;
}
.controles button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 4px 12px;
}
.controles button:disabled {
  opacity: 0.4;
}
.principal {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand-1) !important;
  font-weight: 600;
}
.note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 10px 0 0;
}
</style>
