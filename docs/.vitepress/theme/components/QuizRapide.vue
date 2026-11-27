<script setup lang="ts">
import { ref, computed } from "vue";

type Question = { question: string; code?: string; choix: string[]; bonne: number; explication: string };

const props = defineProps<{ titre: string; questions: Question[] }>();

const reponses = ref<(number | null)[]>(props.questions.map(() => null));
const score = computed(() => reponses.value.filter((r, i) => r === props.questions[i].bonne).length);
const fini = computed(() => reponses.value.every((r) => r !== null));
</script>

<template>
  <div class="demo">
    <div class="entete">
      <span class="titre">{{ titre }}</span>
      <span v-if="fini" class="score">{{ score }} / {{ questions.length }}</span>
    </div>
    <div v-for="(q, i) in questions" :key="i" class="question">
      <p class="enonce"><span class="num">{{ i + 1 }}</span>{{ q.question }}</p>
      <pre v-if="q.code"><code>{{ q.code }}</code></pre>
      <div class="choix">
        <button
          v-for="(c, j) in q.choix"
          :key="j"
          :disabled="reponses[i] !== null"
          :class="{
            bon: reponses[i] !== null && j === q.bonne,
            mauvais: reponses[i] === j && j !== q.bonne,
          }"
          @click="reponses[i] = j"
        >{{ c }}</button>
      </div>
      <p v-if="reponses[i] !== null" class="explication">{{ q.explication }}</p>
    </div>
    <button v-if="fini" class="recommencer" @click="reponses = questions.map(() => null)">Recommencer</button>
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
}
.titre {
  font-weight: 700;
}
.score {
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.question {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}
.enonce {
  margin: 0 0 8px;
  font-weight: 500;
}
.num {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 12px;
  font-weight: 700;
  margin-right: 8px;
}
pre {
  margin: 0 0 8px;
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--vp-code-block-bg);
  font-size: 13px;
  white-space: pre-wrap;
}
.choix {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.choix button {
  text-align: left;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 10px;
  background: var(--vp-c-bg);
  font-size: 14px;
}
.choix button:not(:disabled):hover {
  border-color: var(--vp-c-brand-1);
}
.choix button.bon {
  border-color: #16a34a;
  background: rgba(22, 163, 74, 0.1);
}
.choix button.mauvais {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}
.explication {
  font-size: 14px;
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
}
.recommencer {
  margin-top: 12px;
  font-size: 13px;
  text-decoration: underline;
  color: var(--vp-c-text-2);
}
</style>
