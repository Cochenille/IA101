// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'
import WeeklyTodo from "./components/WeeklyTodo.vue"
import TokenExplorer from "./components/TokenExplorer.vue"
import NextTokenDemo from "./components/NextTokenDemo.vue"
import ContextWindow from "./components/ContextWindow.vue"
import VraiOuInvente from "./components/VraiOuInvente.vue"
import AgentLoop from "./components/AgentLoop.vue"
import PromptBuilder from "./components/PromptBuilder.vue"
import QuizRapide from "./components/QuizRapide.vue"


export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component("WeeklyTodo", WeeklyTodo);
    app.component("TokenExplorer", TokenExplorer);
    app.component("NextTokenDemo", NextTokenDemo);
    app.component("ContextWindow", ContextWindow);
    app.component("VraiOuInvente", VraiOuInvente);
    app.component("AgentLoop", AgentLoop);
    app.component("PromptBuilder", PromptBuilder);
    app.component("QuizRapide", QuizRapide);
  }
}

