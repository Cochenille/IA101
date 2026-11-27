# Plan de cours

## Intention

Vous savez programmer. Vous utilisez déjà l'IA, souvent en copiant une erreur dans un chat et en recollant la réponse.
Ce cours transforme cette habitude en **pratique professionnelle** : savoir ce que le modèle voit, lui donner le bon
contexte, le laisser travailler en boucle avec de quoi vérifier son travail, le guider par une spécification, puis
coordonner plusieurs agents, tout en restant responsable du code livré.

L'idée qui traverse les quatre séances : passer de **« l'IA écrit mon code »** à **« je dirige un agent et je vérifie
son travail »**.

## Déroulement

Quatre séances de 3 heures, du plus fondamental au plus avancé :

| Séance | Date | Thème |
|---|---|---|
| [1](/seances/01-comprendre-la-machine) | Lundi 30 novembre | Comprendre la machine et bien formuler sa demande |
| [2](/seances/02-contexte-et-boucle-agentique) | Jeudi 3 décembre | Contexte et boucle agentique |
| [3](/seances/03-developpement-guide-par-la-spec) | Lundi 7 décembre | Développement guidé par la spécification |
| [4](/seances/04-orchestration-et-pratique-pro) | Jeudi 10 décembre | Orchestration et pratique professionnelle |

Chaque séance alterne une courte partie théorique avec démonstration et une longue activité pratique.

## Le projet fil rouge : Jumelo

Toutes les activités se font sur **[Jumelo](https://github.com/Cochenille/Jumelo)**, l'application WPF du Service des
stages qui jumelle les finissants avec les offres des entreprises. Une équipe de l'an dernier l'a commencée, puis elle
a obtenu son diplôme : **vous la reprenez**. Lisez la mise en situation dans son README avant la première séance.

Jumelo suit les conventions de vos travaux pratiques : WPF en MVVM avec les classes du cours (`ObservableObject`,
`BaseViewModel`, `RelayCommand`), EF Core avec SQLite, tests xUnit et Moq. Vous créez votre propre dépôt à partir du
template au début de la séance 1, puis le projet évolue d'une séance à l'autre.

## Outils

- **GitHub Copilot**, avec la licence gratuite de [GitHub Education](https://education.github.com/).
- **Visual Studio 2026** pour le code et les vues XAML, comme dans vos TP.
- **VS Code** avec C# Dev Kit, à partir de la séance 2, comme poste de pilotage de l'agent.
- **SDK .NET 10** et **Git**.

Les notions du cours ne dépendent pas de l'outil : ce que vous apprenez avec Copilot s'applique à Claude Code, Cursor,
Codex ou aux outils de votre futur employeur.

## Évaluation

Les activités du cours **ne sont pas notées** : ce sont des activités d'apprentissage, faites en classe, dont il reste une
trace dans votre dépôt (commits, fichiers, pull requests) pour en discuter. Des **questions sur les notions** des quatre
séances feront partie de l'**examen final**.
