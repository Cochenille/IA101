# Séance 4 — Orchestration et pratique professionnelle

**Jeudi 10 décembre · 3 heures**

## Objectifs

À la fin de la séance, vous pouvez :

- **étendre un agent** : serveur MCP, commande réutilisable (*prompt file*), agent personnalisé ;
- confier une tâche à un **sous-agent** ou à un **agent en arrière-plan**, et faire travailler des agents **en
  parallèle** ;
- savoir quand **ne pas** orchestrer : coût, complexité, difficulté à vérifier ;
- reconnaître les **risques** d'une pratique avec l'IA : injection de prompt, secrets, paquets inventés,
  confidentialité, licences, dette technique, perte de compétences.

## Avant la séance

Terminez la fonctionnalité commencée à la séance 3 et poussez-la dans votre dépôt.

## Déroulement

| Durée | Activité |
|---|---|
| 30 min | Étendre l'agent : brancher un serveur MCP, créer une commande et un agent personnalisés. |
| 30 min | Sous-agents, travail en parallèle, agent en arrière-plan sur une issue GitHub (démonstration). |
| 10 min | Pause |
| 55 min | **Activité** |
| 25 min | Pratique professionnelle : sécurité, confidentialité et Loi 25, licences, dette, compétences. |
| 30 min | **Retour au diagnostic** de la séance 1, puis bilan du cours. |

## Activité

1. Créez une commande réutilisable `/nouvelle-vue` qui produit une vue, son ViewModel et ses tests selon les
   conventions du projet.
2. Créez un **agent réviseur** qui relit une pull request et signale tout écart aux règles MVVM du cours.
3. Confiez à un agent une issue de **dette technique** de Jumelo, puis relisez sa pull request comme un réviseur.
4. Lancez **deux tâches en parallèle**, chacune dans sa propre branche, et intégrez-les.

## Retour au diagnostic

Reprenez le problème de la séance 1 avec tout ce que vous avez appris. Comparez vos requêtes, le temps passé et la
qualité du résultat avec ce que vous aviez fait au premier jour.

## Notions à retenir

- Un agent qui lit une page web, un fichier ou un serveur MCP peut y trouver des instructions malveillantes : le
  contenu lu n'est jamais un ordre.
- Pas de secret dans le contexte, et pas de code propriétaire dans un outil que votre employeur n'a pas approuvé.
- Vérifiez qu'un paquet proposé par l'IA existe vraiment avant de l'installer.
- Orchestrer plusieurs agents multiplie aussi le code à relire : vous signez tout ce qui est livré.
