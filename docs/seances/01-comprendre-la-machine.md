# Séance 1 — Comprendre la machine et bien formuler sa demande

**Lundi 30 novembre · 3 heures**

## Objectifs

À la fin de la séance, vous pouvez :

- expliquer ce qu'est un **token**, une **fenêtre de contexte**, et pourquoi un modèle peut répondre avec assurance
  quelque chose de faux ;
- distinguer un **chat** d'un **agent** (un modèle, des outils et une boucle) ;
- rédiger une demande qui donne l'**objectif**, le **contexte**, les **contraintes** et les **critères de réussite** ;
- utiliser **Git** comme filet de sécurité quand un agent modifie votre code.

## Avant la séance

- Votre demande **GitHub Education** est approuvée et **Copilot** est activé sur votre compte.
- **Visual Studio 2026** et le **SDK .NET 10** sont installés (`dotnet --list-sdks`).
- Vous avez lu la mise en situation dans le README de [Jumelo](https://github.com/Cochenille/Jumelo).

## Déroulement

| Durée | Activité |
|---|---|
| 40 min | **Diagnostic** : créer votre dépôt à partir du template Jumelo, puis régler un problème signalé par la cliente, **comme vous le faites d'habitude**. Gardez toutes vos requêtes. |
| 40 min | Ce qu'il y a dans la boîte : tokens, fenêtre de contexte, hallucinations, choix du modèle et requêtes premium, chat ou agent. |
| 10 min | Pause |
| 30 min | Anatomie d'une bonne demande, analysée à partir de **vos propres requêtes** du diagnostic. |
| 50 min | **Activité** : Copilot en mode Agent sur Jumelo. |
| 10 min | Bilan |

## Activité

1. Demandez à l'agent d'**expliquer** l'architecture de Jumelo avant de lui faire modifier quoi que ce soit.
2. Lancez `dotnet test`. Un test échoue : avec l'agent, trouvez pourquoi et corrigez **le code**, pas le test.
3. Relisez le diff avant de l'accepter, puis faites un commit.
4. Revenez au problème du diagnostic avec ce que vous avez appris. Qu'est-ce qui change dans vos requêtes ?

::: warning Ne jamais affaiblir un test
Un agent à qui l'on demande « fais passer le test » peut modifier le test au lieu du code. Vous restez responsable du
code que vous acceptez.
:::

## Notions à retenir

- Un modèle prédit la suite d'un texte, token par token ; ses réponses ne sont pas déterministes.
- Tout ce que le modèle « sait » de votre projet est dans sa fenêtre de contexte. Ce qui n'y est pas, il le devine.
- Une bonne demande dit **quoi**, **pourquoi**, **avec quelles contraintes** et **comment savoir que c'est réussi**.
- Petits commits fréquents : on peut toujours revenir en arrière.
