<script setup lang="ts">
import { ref, computed } from "vue";

type Element = { nom: string; tokens: number; couleur: string };

const catalogue: Element[] = [
  { nom: "Votre question", tokens: 60, couleur: "#3b82f6" },
  { nom: "Message d'erreur collé", tokens: 400, couleur: "#ef4444" },
  { nom: "JumelageViewModel.cs", tokens: 800, couleur: "#10b981" },
  { nom: "Réponse du modèle", tokens: 1500, couleur: "#8b5cf6" },
  { nom: "Toute la solution Jumelo", tokens: 20500, couleur: "#059669" },
  { nom: "Documentation d'EF Core collée", tokens: 20000, couleur: "#f59e0b" },
  { nom: "Journal d'exécution complet", tokens: 60000, couleur: "#64748b" },
];

const consignes: Element = { nom: "Consignes de l'outil (estimation)", tokens: 6000, couleur: "#94a3b8" };

const tailles = [
  { label: "32 000", valeur: 32000 },
  { label: "128 000", valeur: 128000 },
];

const taille = ref(32000);
const contenu = ref<Element[]>([]);
const oublies = ref<Element[]>([]);

const utilise = computed(() => consignes.tokens + contenu.value.reduce((s, e) => s + e.tokens, 0));
const envoyes = ref(0);

const refus = ref("");

function ajouter(e: Element) {
  refus.value = "";
  if (consignes.tokens + e.tokens > taille.value) {
    refus.value = `« ${e.nom} » ne tient pas dans la fenêtre : l'outil le tronque ou le refuse.`;
    return;
  }
  contenu.value.push({ ...e });
  // Quand la fenêtre déborde, les plus vieux éléments sortent (les consignes restent).
  while (utilise.value > taille.value && contenu.value.length > 1) {
    oublies.value.push(contenu.value.shift()!);
  }
  envoyes.value += Math.min(utilise.value, taille.value); // chaque requête renvoie tout le contexte
}

function vider() {
  refus.value = "";
  contenu.value = [];
  oublies.value = [];
  envoyes.value = 0;
}

function changerTaille(v: number) {
  taille.value = v;
  vider();
}

const fmt = (n: number) => n.toLocaleString("fr-CA");
const pct = (n: number) => Math.min(100, (n / taille.value) * 100) + "%";
</script>

<template>
  <div class="demo">
    <div class="entete">
      <span class="titre">La fenêtre de contexte</span>
      <span class="tailles">
        Taille :
        <button
          v-for="t in tailles"
          :key="t.valeur"
          :class="{ actif: t.valeur === taille }"
          @click="changerTaille(t.valeur)"
        >{{ t.label }}</button>
      </span>
    </div>

    <div class="fenetre" role="img" :aria-label="`Fenêtre remplie à ${Math.round((utilise / taille) * 100)} %`">
      <span class="bloc" :style="{ width: pct(consignes.tokens), background: consignes.couleur }" :title="consignes.nom"></span>
      <span
        v-for="(e, i) in contenu"
        :key="i"
        class="bloc"
        :style="{ width: pct(e.tokens), background: e.couleur }"
        :title="`${e.nom} : ${fmt(e.tokens)} tokens`"
      ></span>
    </div>
    <div class="jauge">
      <strong>{{ fmt(utilise) }}</strong> / {{ fmt(taille) }} tokens
      <span v-if="oublies.length" class="alerte">Débordement : {{ oublies.length }} élément(s) sorti(s) de la fenêtre</span>
    </div>
    <p v-if="refus" class="alerte refus">{{ refus }}</p>

    <div class="boutons">
      <button v-for="e in catalogue" :key="e.nom" @click="ajouter(e)">
        <span class="pastille" :style="{ background: e.couleur }"></span>
        {{ e.nom }} <small>{{ fmt(e.tokens) }}</small>
      </button>
      <button class="vider" @click="vider">Vider</button>
    </div>

    <div class="listes">
      <div>
        <div class="sous-titre">Ce que le modèle voit</div>
        <ul>
          <li class="fixe">{{ consignes.nom }}</li>
          <li v-for="(e, i) in contenu" :key="i">{{ e.nom }}</li>
        </ul>
      </div>
      <div v-if="oublies.length">
        <div class="sous-titre">Oublié</div>
        <ul>
          <li v-for="(e, i) in oublies" :key="i" class="oublie">{{ e.nom }}</li>
        </ul>
      </div>
      <div>
        <div class="sous-titre">Tokens envoyés au total</div>
        <p class="envoyes">{{ fmt(envoyes) }}</p>
        <p class="note">Chaque requête renvoie tout le contexte : une longue conversation coûte de plus en plus cher.</p>
      </div>
    </div>
    <p class="note">
      Nombres approximatifs. La solution Jumelo complète fait environ 20 500 tokens. La taille réelle de la fenêtre varie
      selon le modèle, de quelques dizaines de milliers à plus d'un million de tokens.
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
.entete {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.titre {
  font-weight: 700;
}
.tailles {
  font-size: 13px;
  display: flex;
  gap: 4px;
  align-items: center;
}
.tailles button,
.boutons button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 13px;
  background: var(--vp-c-bg);
}
.tailles button.actif {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.fenetre {
  display: flex;
  height: 36px;
  margin-top: 14px;
  border: 2px solid var(--vp-c-text-2);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.bloc {
  display: block;
  height: 100%;
  border-right: 1px solid var(--vp-c-bg);
  transition: width 0.3s;
  flex-shrink: 0;
}
.jauge {
  font-size: 14px;
  margin-top: 6px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.alerte {
  color: #dc2626;
  font-weight: 600;
}
.refus {
  font-size: 14px;
  margin: 6px 0 0;
}
.boutons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}
.boutons button:hover {
  border-color: var(--vp-c-brand-1);
}
.boutons small {
  color: var(--vp-c-text-2);
}
.pastille {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 2px;
}
.vider {
  font-weight: 600;
}
.listes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 12px;
  font-size: 14px;
}
.listes ul {
  margin: 4px 0;
  padding-left: 18px;
}
.listes li {
  margin: 0;
}
.sous-titre {
  font-weight: 600;
}
.fixe {
  color: var(--vp-c-text-2);
}
.oublie {
  text-decoration: line-through;
  color: #dc2626;
}
.envoyes {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 4px 0;
}
.note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 6px 0 0;
}
</style>
