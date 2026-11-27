<script setup lang="ts">
import { ref, computed } from "vue";

type Reponse = "existe" | "invente" | "pasIci";

const choix: { id: Reponse; label: string }[] = [
  { id: "existe", label: "Existe" },
  { id: "invente", label: "N'existe pas" },
  { id: "pasIci", label: "Existe, mais pas dans Jumelo" },
];

const cartes: { code: string; reponse: Reponse; explication: string }[] = [
  {
    code: "etudiants.RemoveAll(e => e.Moyenne < 60);",
    reponse: "existe",
    explication: "List<T>.RemoveAll existe depuis longtemps et retourne le nombre d'éléments retirés.",
  },
  {
    code: "var titre = offre.Titre.Truncate(30);",
    reponse: "invente",
    explication:
      "Aucune méthode Truncate sur string dans .NET. Le nom est plausible parce qu'il existe dans d'autres langages et dans des bibliothèques tierces.",
  },
  {
    code: "var meilleur = etudiants.MaxBy(e => e.Moyenne);",
    reponse: "existe",
    explication: "MaxBy fait partie de LINQ depuis .NET 6.",
  },
  {
    code: "[ObservableProperty]\nprivate string nom;",
    reponse: "pasIci",
    explication:
      "Cet attribut vient du paquet CommunityToolkit.Mvvm. Jumelo utilise les classes maison du cours (ObservableObject) : ce code ne compile pas dans le projet.",
  },
  {
    code: "etudiants.RemoveWhere(e => e.Moyenne < 60);",
    reponse: "invente",
    explication:
      "RemoveWhere existe sur HashSet<T> et SortedSet<T>, pas sur List<T>. Le modèle a mélangé deux types qui se ressemblent.",
  },
  {
    code: "CommandManager.InvalidateRequerySuggested();",
    reponse: "existe",
    explication: "Méthode WPF qui force la réévaluation de CanExecute de toutes les commandes.",
  },
  {
    code: 'MessageBox.Show("Jumelage créé");\n// dans JumelageViewModel',
    reponse: "pasIci",
    explication:
      "MessageBox existe dans WPF, mais un ViewModel de Jumelo passe par IServiceDialogue. Un MessageBox dans un ViewModel le rend impossible à tester.",
  },
  {
    code: "var moyenne = Math.Clamp(valeur, 0, 100);",
    reponse: "existe",
    explication: "Math.Clamp existe depuis .NET Core 2.0.",
  },
];

const reponses = ref<(Reponse | null)[]>(cartes.map(() => null));
const score = computed(() => reponses.value.filter((r, i) => r === cartes[i].reponse).length);
const repondues = computed(() => reponses.value.filter((r) => r !== null).length);
const libelle = (id: Reponse) => {
  const l = choix.find((c) => c.id === id)!.label;
  return l.charAt(0).toLowerCase() + l.slice(1);
};

function recommencer() {
  reponses.value = cartes.map(() => null);
}
</script>

<template>
  <div class="demo">
    <div class="entete">
      <span class="titre">Existe ou inventé ?</span>
      <span class="score">{{ score }} / {{ repondues }} <button v-if="repondues" @click="recommencer">Recommencer</button></span>
    </div>
    <p class="consigne">Un assistant vous a proposé chacune de ces lignes, avec la même assurance. Lesquelles compilent ?</p>
    <div class="grille">
      <div
        v-for="(c, i) in cartes"
        :key="i"
        class="carte"
        :class="{ bon: reponses[i] && reponses[i] === c.reponse, mauvais: reponses[i] && reponses[i] !== c.reponse }"
      >
        <pre><code>{{ c.code }}</code></pre>
        <div v-if="!reponses[i]" class="choix">
          <button v-for="ch in choix" :key="ch.id" @click="reponses[i] = ch.id">{{ ch.label }}</button>
        </div>
        <div v-else class="verdict">
          <strong>{{ reponses[i] === c.reponse ? "Exact" : "Non" }} : {{ libelle(c.reponse) }}.</strong>
          {{ c.explication }}
        </div>
      </div>
    </div>
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
}
.titre {
  font-weight: 700;
}
.score {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  display: flex;
  gap: 8px;
  align-items: center;
}
.score button {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  text-decoration: underline;
}
.consigne {
  font-size: 14px;
  margin: 6px 0 12px;
}
.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
}
.carte {
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.carte.bon {
  border-color: #16a34a;
}
.carte.mauvais {
  border-color: #dc2626;
}
pre {
  margin: 0;
  padding: 8px;
  border-radius: 6px;
  background: var(--vp-code-block-bg);
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 13px;
  line-height: 1.5;
}
.choix {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.choix button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 13px;
}
.choix button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.verdict {
  font-size: 13px;
  line-height: 1.5;
}
.bon .verdict strong {
  color: #16a34a;
}
.mauvais .verdict strong {
  color: #dc2626;
}
</style>
