<script setup lang="ts">
import { ref, computed } from "vue";

const parties = [
  {
    id: "objectif",
    nom: "Objectif",
    question: "Quoi, et pourquoi ?",
    couleur: "#2563eb",
    texte:
      "Dans l'écran Jumelage de Jumelo, je veux que les offres comblées affichent « Complet » au lieu de « 0 place(s) restante(s) », pour que la coordonnatrice les repère d'un coup d'œil.",
  },
  {
    id: "contexte",
    nom: "Contexte",
    question: "Qu'est-ce que l'IA doit savoir ?",
    couleur: "#16a34a",
    texte:
      "Le projet est en WPF MVVM avec nos classes maison (ObservableObject, BaseViewModel, RelayCommand). Le texte est dans View/JumelageView.xaml et le nombre vient de Offre.PlacesRestantes. Lis ces fichiers avant de proposer quoi que ce soit.",
  },
  {
    id: "contraintes",
    nom: "Contraintes",
    question: "Qu'est-ce qui est interdit ou imposé ?",
    couleur: "#d97706",
    texte:
      "Pas de code-behind. N'ajoute aucun paquet NuGet. Garde les noms en français comme le reste du projet. Ne modifie pas les tests existants.",
  },
  {
    id: "criteres",
    nom: "Critères de réussite",
    question: "Comment saura-t-on que c'est réussi ?",
    couleur: "#9333ea",
    texte:
      "La solution compile, tous les tests passent, et un nouveau test vérifie le texte pour une offre avec des places et pour une offre comblée.",
  },
];

const actives = ref<Record<string, boolean>>({});
const nb = computed(() => parties.filter((p) => actives.value[p.id]).length);
const toutes = computed(() => nb.value === parties.length);
</script>

<template>
  <div class="demo">
    <div class="titre">Anatomie d'une demande</div>
    <div class="interrupteurs">
      <button
        v-for="p in parties"
        :key="p.id"
        :class="{ actif: actives[p.id] }"
        :style="{ '--c': p.couleur }"
        @click="actives[p.id] = !actives[p.id]"
      >
        <span class="case">{{ actives[p.id] ? "✓" : "+" }}</span>
        <span>
          <strong>{{ p.nom }}</strong>
          <small>{{ p.question }}</small>
        </span>
      </button>
    </div>

    <div class="requete">
      <p v-if="nb === 0" class="vague">Il y a un bug dans l'affichage des places. Corrige.</p>
      <template v-for="p in parties" :key="p.id">
        <p v-if="actives[p.id]" class="morceau" :style="{ '--c': p.couleur }">
          <span class="etiquette">{{ p.nom }}</span>{{ p.texte }}
        </p>
      </template>
    </div>

    <p class="verdict" :class="{ ok: toutes }">
      <template v-if="nb === 0">L'agent va deviner ce que vous voulez dire par « bug », où il se trouve et quand s'arrêter.</template>
      <template v-else-if="!toutes">{{ parties.length - nb }} élément(s) encore laissé(s) au hasard.</template>
      <template v-else>L'agent sait quoi faire, où regarder, ce qui est interdit et quand il a fini.</template>
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
.interrupteurs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 8px;
  margin-top: 10px;
}
.interrupteurs button {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  text-align: left;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 8px;
  background: var(--vp-c-bg);
}
.interrupteurs button.actif {
  border-color: var(--c);
}
.interrupteurs small {
  display: block;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}
.case {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-weight: 700;
  border: 2px solid var(--c);
  color: var(--c);
}
.actif .case {
  background: var(--c);
  color: white;
}
.requete {
  margin-top: 14px;
  padding: 14px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  font-size: 15px;
}
.requete p {
  margin: 0 0 8px;
}
.requete p:last-child {
  margin-bottom: 0;
}
.vague {
  font-style: italic;
  color: var(--vp-c-text-2);
}
.morceau {
  border-left: 4px solid var(--c);
  padding-left: 10px;
}
.etiquette {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--c);
  margin-right: 8px;
}
.verdict {
  margin: 10px 0 0;
  font-size: 14px;
  color: #dc2626;
  font-weight: 600;
}
.verdict.ok {
  color: #16a34a;
}
</style>
