<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

type Encodeur = { encode: (t: string) => number[]; decode: (t: number[]) => string };

const exemples = [
  { label: "Français", texte: "La coordonnatrice des stages jumelle les étudiants avec les offres des entreprises." },
  { label: "Anglais", texte: "The internship coordinator matches students with company offers." },
  { label: "Mot long", texte: "anticonstitutionnellement" },
  { label: "Code C#", texte: 'public string NomComplet => $"{Prenom} {Nom}";' },
  { label: "Émojis", texte: "👩‍💻🚀✅" },
  { label: "Nombre", texte: "Le jumelage #12345678 a été créé le 2026-11-30." },
];

const encodages = [
  { id: "o200k_base", label: "GPT-4o et suivants (o200k)" },
  { id: "cl100k_base", label: "GPT-4 (cl100k)" },
];

const texte = ref(exemples[0].texte);
const encodage = ref("o200k_base");
const encodeur = ref<Encodeur | null>(null);
const chargement = ref(true);
const cache: Record<string, Encodeur> = {};

async function charger(id: string) {
  chargement.value = true;
  if (!cache[id]) {
    cache[id] =
      id === "o200k_base"
        ? await import("gpt-tokenizer/encoding/o200k_base")
        : await import("gpt-tokenizer/encoding/cl100k_base");
  }
  encodeur.value = cache[id];
  chargement.value = false;
}

onMounted(() => charger(encodage.value));
watch(encodage, (id) => charger(id));

const tokens = computed(() => {
  if (!encodeur.value) return [];
  return encodeur.value.encode(texte.value).map((id) => {
    const morceau = encodeur.value!.decode([id]);
    // Un émoji peut être coupé en plusieurs tokens qui, seuls, ne forment pas un caractère complet.
    return { id, morceau: morceau === "" || morceau.includes("�") ? "·octet·" : morceau };
  });
});

const nbCaracteres = computed(() => [...texte.value].length);
const ratio = computed(() =>
  tokens.value.length ? (nbCaracteres.value / tokens.value.length).toFixed(1) : "—"
);
const montrerIds = ref(false);
</script>

<template>
  <div class="demo">
    <div class="entete">
      <span class="titre">Découpeur de tokens</span>
      <select v-model="encodage" aria-label="Découpeur">
        <option v-for="e in encodages" :key="e.id" :value="e.id">{{ e.label }}</option>
      </select>
    </div>

    <div class="exemples">
      <button v-for="e in exemples" :key="e.label" @click="texte = e.texte">{{ e.label }}</button>
    </div>

    <textarea v-model="texte" rows="3" spellcheck="false" aria-label="Texte à découper"></textarea>

    <div class="stats">
      <div><strong>{{ chargement ? "…" : tokens.length }}</strong> tokens</div>
      <div><strong>{{ nbCaracteres }}</strong> caractères</div>
      <div><strong>{{ chargement ? "…" : ratio }}</strong> caractères par token</div>
      <label class="ids"><input type="checkbox" v-model="montrerIds" /> Voir les numéros</label>
    </div>

    <div class="jetons" aria-live="polite">
      <span
        v-for="(t, i) in tokens"
        :key="i"
        class="jeton"
        :class="'c' + (i % 6)"
        :title="'Token n° ' + t.id"
      >{{ montrerIds ? t.id : t.morceau.replace(/ /g, "␣").replace(/\n/g, "↵") }}</span>
    </div>
    <p class="note">
      Chaque couleur est un token. Le symbole ␣ est une espace. Le modèle ne voit jamais vos lettres : il voit la suite
      de numéros.
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
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.titre {
  font-weight: 700;
}
select,
textarea {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 6px 8px;
  font: inherit;
}
textarea {
  width: 100%;
  margin-top: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
}
.exemples {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}
.exemples button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 12px;
  font-size: 13px;
  background: var(--vp-c-bg);
}
.exemples button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin: 10px 0;
  font-size: 14px;
  align-items: center;
}
.stats strong {
  font-size: 22px;
  color: var(--vp-c-brand-1);
}
.ids {
  margin-left: auto;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.jetons {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
  min-height: 32px;
}
.jeton {
  padding: 2px 4px;
  border-radius: 4px;
  white-space: pre;
}
.c0 { background: #bfdbfe; color: #1e3a8a; }
.c1 { background: #bbf7d0; color: #14532d; }
.c2 { background: #fde68a; color: #713f12; }
.c3 { background: #fbcfe8; color: #831843; }
.c4 { background: #ddd6fe; color: #4c1d95; }
.c5 { background: #fed7aa; color: #7c2d12; }
.note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 10px 0 0;
}
</style>
