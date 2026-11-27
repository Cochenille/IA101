<script setup lang="ts">
import { ref, computed } from "vue";

// Probabilités inventées pour l'illustration : elles imitent le comportement d'un modèle, sans en venir d'un vrai.
const phrases = [
  {
    debut: "Il était une",
    suites: [
      ["fois", 0.95],
      ["autre", 0.02],
      ["histoire", 0.015],
      ["princesse", 0.01],
      ["erreur", 0.005],
    ],
  },
  {
    debut: "La capitale de l'Australie est",
    suites: [
      ["Canberra", 0.7],
      ["Sydney", 0.22],
      ["Melbourne", 0.05],
      ["une", 0.02],
      ["Perth", 0.01],
    ],
  },
  {
    debut: "Le meilleur langage de programmation est",
    suites: [
      ["Python", 0.3],
      ["celui", 0.2],
      ["C#", 0.16],
      ["JavaScript", 0.14],
      ["Rust", 0.12],
      ["le", 0.08],
    ],
  },
  {
    debut: "Pour corriger ce bogue, il faut",
    suites: [
      ["vérifier", 0.34],
      ["modifier", 0.26],
      ["ajouter", 0.2],
      ["supprimer", 0.12],
      ["redémarrer", 0.08],
    ],
  },
] as const;

const choix = ref(0);
const temperature = ref(1);
const tirages = ref<string[]>([]);

const phrase = computed(() => phrases[choix.value]);

const distribution = computed(() => {
  const suites = phrase.value.suites as readonly (readonly [string, number])[];
  if (temperature.value === 0) {
    return suites.map(([mot], i) => ({ mot, p: i === 0 ? 1 : 0 }));
  }
  const poids = suites.map(([, p]) => Math.pow(p, 1 / temperature.value));
  const total = poids.reduce((a, b) => a + b, 0);
  return suites.map(([mot], i) => ({ mot, p: poids[i] / total }));
});

function tirer(): string {
  let r = Math.random();
  for (const { mot, p } of distribution.value) {
    if ((r -= p) <= 0) return mot;
  }
  return distribution.value[0].mot;
}

function generer(n: number) {
  tirages.value = Array.from({ length: n }, tirer);
}

const compte = computed(() => {
  const c: Record<string, number> = {};
  for (const m of tirages.value) c[m] = (c[m] ?? 0) + 1;
  return c;
});

function changerPhrase(i: number) {
  choix.value = i;
  tirages.value = [];
}
</script>

<template>
  <div class="demo">
    <div class="titre">Quel est le mot suivant ?</div>
    <div class="phrases">
      <button
        v-for="(p, i) in phrases"
        :key="i"
        :class="{ actif: i === choix }"
        @click="changerPhrase(i)"
      >{{ p.debut }}…</button>
    </div>

    <p class="debut">
      {{ phrase.debut }}
      <span class="suite">{{ tirages.length ? tirages[tirages.length - 1] : " ? " }}</span>
    </p>

    <div class="barres">
      <div v-for="d in distribution" :key="d.mot" class="ligne">
        <span class="mot">{{ d.mot }}</span>
        <span class="piste"><span class="barre" :style="{ width: d.p * 100 + '%' }"></span></span>
        <span class="pct">{{ (d.p * 100).toFixed(0) }} %</span>
        <span class="compte" v-if="tirages.length > 1">{{ compte[d.mot] ?? 0 }}×</span>
      </div>
    </div>

    <div class="controles">
      <label>
        Température : <strong>{{ temperature.toFixed(1) }}</strong>
        <input type="range" min="0" max="2" step="0.1" v-model.number="temperature" @input="tirages = []" />
      </label>
      <button class="principal" @click="generer(1)">Générer</button>
      <button class="principal" @click="generer(20)">Générer 20 fois</button>
    </div>
    <p class="note">
      Probabilités inventées pour l'illustration. À température 0, le modèle prend toujours le plus probable ; plus la
      température monte, plus les choix improbables sortent.
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
.phrases {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.phrases button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 12px;
  font-size: 13px;
  background: var(--vp-c-bg);
}
.phrases button.actif {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.debut {
  font-size: 24px;
  margin: 18px 0 12px;
  line-height: 1.3;
}
.suite {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  border-bottom: 3px solid var(--vp-c-brand-1);
}
.ligne {
  display: grid;
  grid-template-columns: 110px 1fr 48px 40px;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin: 4px 0;
}
.mot {
  font-family: var(--vp-font-family-mono);
  overflow: hidden;
  text-overflow: ellipsis;
}
.piste {
  height: 14px;
  background: var(--vp-c-bg);
  border-radius: 7px;
  overflow: hidden;
}
.barre {
  display: block;
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.25s;
}
.pct,
.compte {
  text-align: right;
  color: var(--vp-c-text-2);
}
.compte {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.controles {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 14px;
}
.controles label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.principal {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border-radius: 8px;
  padding: 4px 14px;
  font-weight: 600;
}
.principal:hover {
  background: var(--vp-c-brand-2);
}
.note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 10px 0 0;
}
@media (max-width: 480px) {
  .ligne {
    grid-template-columns: 80px 1fr 40px 32px;
  }
}
</style>
